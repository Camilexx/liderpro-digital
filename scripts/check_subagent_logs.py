import json
import os

subagents = [
    "c34975b1-8871-4f0c-bdbc-8364692dda39",
    "3bf57313-fc59-467f-8467-270ba9d868ea",
    "35625ee5-f366-41b7-bf0e-e1ecafbeee55"
]

for sa in subagents:
    transcript_path = os.path.join(r"C:\Users\PC\.gemini\antigravity\brain", sa, ".system_generated", "logs", "transcript.jsonl")
    print(f"\n=== Subagent: {sa} ===")
    if os.path.exists(transcript_path):
        with open(transcript_path, "r", encoding="utf-8") as f:
            for line in f:
                data = json.loads(line)
                if data.get("type") in ["USER_INPUT", "PLANNER_RESPONSE"]:
                    content = str(data.get("content", ""))
                    if "ecuador" in content.lower() or "png" in content.lower() or "generated" in content.lower():
                        print(f"[{data.get('type')}] {content[:200]}...")
    else:
        print("Transcript not found.")
