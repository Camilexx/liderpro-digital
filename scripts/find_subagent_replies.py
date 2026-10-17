import json

transcript_path = r"C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.system_generated\logs\transcript.jsonl"

with open(transcript_path, "r", encoding="utf-8") as f:
    for line in f:
        data = json.loads(line)
        content = str(data.get("content", ""))
        sender = data.get("source", "")
        # look for image filenames or subagent outputs
        if any(w in content for w in ["ecuador-shd", "group31", "n150", "group34", "3bf57313", "c34975b1"]):
            print(f"Step {data.get('step_index')}: {content[:300]}...\n")
