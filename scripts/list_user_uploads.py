import os

user_upload_dir = r'C:\Users\PC\.gemini\antigravity\brain\bbbff1a7-d87f-4f17-a9de-dc3f94a57663\.user_uploaded'
print("--- User Uploads Directory ---")
for f in os.listdir(user_upload_dir):
    p = os.path.join(user_upload_dir, f)
    print(f"{f:<45} | {os.path.getsize(p):>10} B")
