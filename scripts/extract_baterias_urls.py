import re

path = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.system_generated\steps\5406\content.md'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

imgs = set(re.findall(r'https?://[^\s"\'<>]+\.(?:png|jpg|webp)', text))
uploads = [i for i in imgs if 'wp-content/uploads' in i]
for u in sorted(uploads):
    print(u)
