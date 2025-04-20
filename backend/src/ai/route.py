import asyncio
import json
import os

from langchain_core.prompts import ChatPromptTemplate
from flask import Blueprint, request, jsonify
from src.extensions import model

ASSETS_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../assets/frontend_routes.json'))
def load_frontend_routes():
    with open(ASSETS_PATH, 'r') as f:
        routes = json.load(f)
    return "\n".join([f"- {r['path']} → {r['description']}" for r in routes])

ai_bp = Blueprint('ai_bp',__name__)

def run_chain(chain, instruction):
    return chain.invoke({"instruction": instruction})

@ai_bp.route('/process', methods=['POST'])
def process_ai():
    try:
        data = request.get_json()
        instruction = data.get("instruction", "").strip()

        if not instruction:
            return jsonify({
                "success": False,
                "message": "Instruction is required.",
                "route": None
            }), 400

        route_list = load_frontend_routes()

        template = f"""
        You are a helpful assistant for an admin dashboard.

        Here are the available frontend pages:
        {route_list}

        Given the user's instruction, respond with a valid JSON containing:
        - 'message': a friendly instruction summary
        - 'route': the exact frontend path the user should go to. Only respond with one of the listed routes above.

        If the user's instruction does not correspond to any of the available routes, respond with:
        - 'message': "Sorry, I couldn't find a relevant page for that instruction."
        - 'route': None

        Respond ONLY in valid JSON format.

        Instruction: {{instruction}}
        """

        prompt = ChatPromptTemplate.from_template(template)
        chain = prompt | model

        result = asyncio.run(asyncio.to_thread(run_chain, chain, instruction))

        try:
            parsed = json.loads(result)
            return jsonify({
                "success": True,
                "message": parsed.get("message", "Here's what I found."),
                "route": parsed.get("route", None)
            })
        except json.JSONDecodeError:
            return jsonify({
                "success": False,
                "message": "⚠️ Sorry, I couldn't understand the AI's response.",
                "route": None,
                "raw": result
            })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# @ai_bp.post('/simple_prompt')
# def simple_ai_prompt():
#     try:
#         data = request.get_json()
#         payload = data.get('payload')

#         if payload:
#             result = chain.invoke({"questions": payload})
#             return jsonify({'message': result}), 400
#         else:
#             raise Exception("You dit not provide payload")
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400