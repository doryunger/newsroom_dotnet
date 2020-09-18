import random
import requests
import json
from datetime import datetime

def randomKey(range):
    fault='yes'
    pos = random.randint(0, range-1)
    if keys[pos] in faultKeys:
        while(fault=='yes'):
            pos = random.randint(0, range-1)
            if keys[pos] not in faultKeys:
                fault='no'
            elif len(faultKeys)==len(keys):
                fault='no'
                pos=10
    return pos
now = datetime.now()
dt_string = now.strftime("%d/%m/%Y %H:%M")
countries=['us','cn','gb','ch','de','il','ru','au','br','ae']
sources=['cnn','fox-news','nbc-news','al-jazeera-english','bloomberg','techcrunch','independent','the-washington-post','time','crypto-coins-news']
faultKeys=[]
keys=['995e7280de9e48c79439af57b3edd3d1','9c093cbbd2db40a0bab8b4359213fae8','f0d8cd6296c04a3a95fa8b48a86bfbe2','71eba7f3a9774803a55870f8e5f2ce2f','cd3e0e3d9f464cf7b48042978623a685']
results={}
results['update']='Last update:'+dt_string+' UTC'
index=randomKey(len(keys))
status='no'
for country in countries:
    response = requests.get('https://newsapi.org/v2/top-headlines?country='+country+'&apiKey='+keys[index])
    decode=response.content.decode("utf-8")
    r = json.loads(decode)
    if r['status']=='error' and index<10:
        faultKeys.append(keys[index])
        index=randomKey(len(keys))
        while(status=='no'):
            response = requests.get('https://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=' + keys[index])
            decode = response.content.decode("utf-8")
            r = json.loads(decode)
            if r['status'] != 'error':
                status='yes'
            else:
                if keys[index] not in faultKeys:
                    faultKeys.append(keys[index])
                index=randomKey(len(keys))
                if  index==10:
                    status='yes'
                    r='error'
        if r!='error':
            results[country]=r
    elif r['status']!='error':
        results[country] = r
for source in sources:
    response = requests.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+keys[index])
    decode=response.content.decode("utf-8")
    r = json.loads(decode)
    if r['status']=='error' and index<10:
        faultKeys.append(keys[index])
        index = randomKey(len(keys))
        while(status=='no'):
            response = requests.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+keys[index])
            decode = response.content.decode("utf-8")
            r = json.loads(decode)
            if r['status'] != 'error':
                status='yes'
            else:
                if keys[index] not in faultKeys:
                    faultKeys.append(keys[index])
                index = randomKey(len(keys))
                if index == 10:
                    status = 'yes'
                    r = 'error'
        if r!='error':
            results[source]=r
    elif r['status']!='error':
        results[source] = r
        with open('/opt/bitnami/apps/newsroom/dist/assets/data.json', 'w', encoding='utf8') as outfile:
            json.dump(results, outfile, ensure_ascii=False)
