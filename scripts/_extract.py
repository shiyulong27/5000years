import json, sys
sys.stdout.reconfigure(encoding='utf-8')
p = r'C:\Users\liwei\.claude\projects\d--project-git-5000years\c95b1e70-9c13-44b4-b388-325751d741d9.jsonl'
lines = open(p, encoding='utf-8').readlines()
for i, line in enumerate(lines[1120:], start=1120):
    try:
        d = json.loads(line)
    except Exception:
        continue
    m = d.get('message', {})
    c = m.get('content')
    if isinstance(c, list):
        for x in c:
            if isinstance(x, dict) and x.get('type') == 'text':
                t = x.get('text', '')
                if '条目' in t or '问题类型' in t or 'task-notification' in t:
                    print('=== line %d (%s) ===' % (i, d.get('type')))
                    print(t[:5000])
                    print()
