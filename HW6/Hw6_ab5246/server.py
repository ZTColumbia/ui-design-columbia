from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


data = [
   {
       "id": 1,
       "title": "Kings and Generals",
       "image": "https://yt3.ggpht.com/ytc/AKedOLSsH9BNP2iH3rYPPb8tCn--Uaycnv6Gs6KWH--N2Iw=s176-c-k-c0x00ffffff-no-rj",
       "summary": "Kings and Generals is one of the largest youtube history channels which creates and distributes animated historical documentaries. The channel features various concurrently running series covering periods in history as diverse as the Great Northern War and the Roman Civil War. The channel often focuses mainly on battles, but also gives in depth descriptions of some of the most important events as well as the famous civilizations in history. Each series is doled out in a sequence of digestible chunks so that you can try as little or binge as much as you would like. The channel is much appreciated for its excellent quality of narration and animation.",
       "link": "https://www.youtube.com/c/KingsandGenerals",
       "subscribers": "2.45M",
       "views": "409M",
       "genres": ["Ancient Battles" , "Vikings", "Mongols", "Crusades", "Modern Warfare"]
   },
   {
       "id": 2,
       "title": "Extra Credits",
       "image": "https://yt3.ggpht.com/ytc/AKedOLSXHxan8rCtIdWnx1N65MxJ2P6M6pJD7NAOX5LRuQ=s176-c-k-c0x00ffffff-no-rj",
       "summary": "Extra Credits is an educational YouTube channel made by entertainment enthusiasts with backgrounds in game design, television production, literature and academia. The channel creates short-form animated video essays every week about game design, world history, mythology, and other subjects. Their history videos cover a wide range of topics including often ignored areas like the history of the Inca Empire, Majapahit in Indonesia and the Empire of Mali. There are also many playlists on Roman history, Japanese history and Modern history.",
       "link": "https://www.youtube.com/extracredits",
       "subscribers": "2.62M",
       "views": "835M",
       "genres": ["Modern History", "Japanese History", "Roman History", "World Wars"]
   },
   {
       "id": 3,
       "title": "The Great War",
       "image": "https://yt3.ggpht.com/ytc/AKedOLSYKb9LMQWhtCPuzkvJbWI3c3XrrcWqmw2q2FGqzg=s176-c-k-c0x00ffffff-no-rj",
       "summary": "The Great War covers the First World War from 1914 to 1923 in real time. Every other week, Jesse Alexander cover the important events that influenced the world 100 years ago. Form 2014 - 2018, Indiana Neidell followed the main events of what is classically considered as World War 1 on a weekly basis. ",
       "link": "https://www.youtube.com/c/TheGreatWarSeries",
       "subscribers": "1.39M",
       "views": "255M",
       "genres": ["World Wars", "Modern Warfare", "European History"]
   },
   {
       "id": 4,
       "title": "History Matters",
       "image": "https://yt3.ggpht.com/ytc/AKedOLTfHX-5O2Sa80AFAOkVFvmfg2UqnOGfUyErAqjHBw=s176-c-k-c0x00ffffff-no-rj",
       "summary": "History Matters is a history-focused channel which aims to help students studying for A levels, GCSEs and AP World/Euro History by providing short 5 minute introductions to multiple topics. The episodes released are designed to act as both intros and as revision material for students or people who are simply interested in World History. Videos will also focus on the lesser-known parts of history too and dive deep into questions that many people ask but aren't often answered.",
       "link": "https://www.youtube.com/c/TenMinuteHistory",
       "subscribers": "1.18M",
       "views": "342M",
       "genres": ["Short Videos" , "Modern History", "European History"]
   },
   {
       "id": 5,
       "title": "HistoryMarche",
       "image": "https://yt3.ggpht.com/ytc/AKedOLRBKO0IQtTh52M7GlT2U0iT_Rqs_LOo-3KxVEbpAg=s176-c-k-c0x00ffffff-no-rj",
       "summary": "HistoryMarche is an animated history documentary channel mainly focussed on battles in ancient and medieval history in Europe and the Middle East. Some of their most popular playlists include the series on Hannibal and the Second Punic War, the Romanian wars of Mihai the Brave and the Sengoku Jidai period of Japan. Videos are generally 20 minutes long.",
       "link": "https://www.youtube.com/c/HistoryMarche",
       "subscribers": "556K",
       "views": "49M",
       "genres": ["Ancient Battles", "Medieval Battles", "Roman History", "European History", "Islamic History", "Japanese History"]
   },
   {
       "id": 6,
       "title": "Epic History TV",
       "image": "https://yt3.ggpht.com/ytc/AKedOLTvlhb8YwJzhiIpGqfXUZRiyorfGwOeeU7JBZlMIQ=s176-c-k-c0x00ffffff-no-rj",
       "summary": "Epic History TV is a popular history channel primarily focusing on modern history while also delving into medieval battles. Their most watched playlist in their extensive 28 part series on the Napoleonic Wars from 1793-1815. Other popular topics include a series on the conquest of Alexander the Great and one on Russian history.",
       "link": "https://www.youtube.com/c/EpichistoryTv",
       "subscribers": "1.31M",
       "views": "116M",
       "genres": ["European History", "Modern Warfare", "Medieval History"]
   },
   {
       "id": 7,
       "title": "Invicta",
       "image": "https://yt3.ggpht.com/ytc/AKedOLSbTUfVMeFVhtgBIeYTxXs711ALzUbiN2uMhMAfjQ=s176-c-k-c0x00ffffff-no-rj",
       "summary": "Invicta is a youtube channel that produces history documentary videos on fascinating people and places from the past. They cover all sorts of historical topics such as the war of Alexander the Great in Persia, the politics of Julius Caesar in Ancient Rome, the fashion of kings in Medieval times, and much more. Their featured history documentary series include 'Moments in History', 'How They Did It' and 'The Art of War'.",
       "link": "https://www.youtube.com/c/InvictaHistory",
       "subscribers": "1.15M",
       "views": "177M",
       "genres": ["Ancient History" , "Roman History", "Aztecs", "Chinese History"]
   },
   {
       "id": 8,
       "title": "BazBattles",
       "image": "https://yt3.ggpht.com/ytc/AKedOLQy_s7UBfzJXVpTAifTkWImqFmL7C0zRlVxbE27=s176-c-k-c0x00ffffff-no-rj",
       "summary": "BazBattles covers historical battles, tactics, politics and all things related served as smooth animated narration. They cover conflicts throughout history, from Ancient Greece to the 20th century, with a focus on ancient battles, especially in the Greek and Roman Era.",
       "link": "https://www.youtube.com/c/BazBattles",
       "subscribers": "697K",
       "views": "81M",
       "genres": ["Ancient History", "Greek History", "Japanese History", "Vikings", "Crusades"]
   },
   {
       "id": 9,
       "title": "Jabzy",
       "image": "https://yt3.ggpht.com/ytc/AKedOLSg2vS86Z_JhFzK7Sy4d77K9PWtzXBEOduQweQENw=s176-c-k-c0x00ffffff-no-rj",
       "summary": "Jabzy is a youtube history channel producing 15 minute videos focussed mainly on lesser known aspects of European History in the late medieval and modern periods. Many of their videos cover various historical plans which were abandoned and would have had an impact on world history such as the plan to create a Romani state and plans to partition China among the European powers.",
       "link": "https://www.youtube.com/c/JabzyJoe",
       "subscribers": "181K",
       "views": "31M",
       "genres": ["Short Videos" , "European History", "Modern History"]
   },
   {
       "id": 10,
       "title": "The Cold War",
       "image": "https://yt3.ggpht.com/ytc/AKedOLQiGZnDpqB-G_1FsHNiyQl6XfLpXVPdU8PbB5Cx=s176-c-k-c0x00ffffff-no-rj",
       "summary": "Kings and Generals creates and distributes animated historical documentaries. The channel features various concurrently running series covering periods in history as diverse as the Great Northern War and the Roman Civil War. The channel often focuses mainly on battles, but also gives in depth descriptions of some of the most important events as well as the famous civilizations in history. Each series is doled out in a sequence of digestible chunks so that you can try as little or binge as much as you would like.",
       "link": "https://www.youtube.com/channel/UCCGvq-qmjFmmMD4e-PLQqGg",
       "subscribers": "285K",
       "views": "20M",
       "genres": ["Modern Warfare", "Modern History", "World Wars"]
   },
   {
       "id": 11,
       "title": "Hoc Est Bellum",
       "image": "https://yt3.ggpht.com/ytc/AKedOLTrjteTNS0QgTbYUMcEdeGSqrdJbilo8ydMEdDB-g=s176-c-k-c0x00ffffff-no-rj",
       "summary": "Hoc Est Bellum is a relatively new and fast growing youtube history channel which concentrates exclusively on the history of ancient Rome and Greece. Some of its popular videos include the series on the Ionian revolt, the Greco-Persian War and the Roman Civil War.",
       "link": "https://www.youtube.com/channel/UCl5m12RUvypT4e7w-mWrzsA",
       "subscribers": "19.4K",
       "views": "436K",
       "genres": ["Ancient Battles" , "Roman History", "Greek History"]
   },
   {
       "id": 12,
       "title": "Knowledgia",
       "image": "https://yt3.ggpht.com/ytc/AKedOLRxXpdJOuqdZ7unrKzC8J1DJm0jh_VZ4jn3lJsvuA=s176-c-k-c0x00ffffff-no-rj",
       "summary": "Knowledgia is a popular youtube history channel that makes animated history videos that answer interesting questions about the world we live. Their focus is oriented towards modern history but also includes elements of medieval and ancient history. Some of their popular videos include 'Why wasn't Portugal conquered by Spain?', 'How did Indonesia become Muslim?' and their series on the Balkan Wars",
       "link": "https://www.youtube.com/c/Knowledgia",
       "subscribers": "987K",
       "views": "120M",
       "genres": ["Modern History" , "European History", "World Wars", "Islamic History"]
   }
]


names = []
for d in data:
    names.append(d["title"])


# home page
@app.route('/')
def main():
    return render_template('home.html', data=data, names=names)


# search results
@app.route('/search_results/<searchkey>', methods=['GET', 'POST'])
def search(searchkey):
    global data
    res = []
    for d in data:
        if searchkey.lower() in d["title"].lower():
            res.append(d)
    return render_template('search_results.html', results=res, searchkey=searchkey, names=names)


# view element with specific id
@app.route('/view/<id>')
def view(id):
    global data
    id = int(id)
    for d in data:
        if d["id"] == id:
            return render_template('view.html', names=names, item=d)


# main
if __name__ == '__main__':
    app.run(debug=True)
