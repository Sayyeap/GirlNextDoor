const story1Dialogues = [
    {
        id: "scene1",
        bg: "Home_enter",
        music: "moonlight",
        nextScene: "scene2",
        dialogues: [
            {
                speaker: "Мия",
                text: "Что ты решишь?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
            },
            {
                speaker: " ",
                text: "Она сидит напротив, на краю бесконечной кровати, или, может, просто парит в этом молочном тумане",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                 speaker: " ",
                text: "Её образ дрожит, как отражение старинном зеркале",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Если пытаться поймать детали и попытаться рассмотреть форму губ, изгиб шеи, запомнить лицо — всё тонет в дымке",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Но если отпустить взгляд, расслабить веки, она становится почти осязаемой. Её присутствие — как ток, пробегающий по венам, — реальное, пугающе живое",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Её пальцы — тонкие, с короткими ногтями, чуть дрожащие — касаются края футболки, облегающей тело",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Она не спешит. Движения медленные, завораживающие, как танец под лоу-фай, которого я не слышу, но чувствую в рёбрах",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Руки скрещиваются перед грудью, она аккуратно хватает футболку за нижнюю часть и ткань начинает ползти вверх, плавно, как вода, стекающая по стеклу.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },{
                speaker: " ",
                text: "Полоска бледной кожи открывается — живот, мягкий, с едва заметной тенью пупка, затем край кружевного лифчика",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },{
                speaker: " ",
                text: "Я ловлю себя на том, что задерживаю дыхание. Сердце стучит в висках, громче, чем гул в этом проклятом сне",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Я знаю, что сейчас всё оборвется. Будильник уже где-то там, в реальном мире, готов вырвать меня, как крючок из этого мира сна. Обычно этот момент — конец",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Сон все не заканчивается, на минуту пробегает мысль, может в этот раз я увижу продолжение, может в этот раз я смогу заглянуть чуть подальше в эту постановку?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: [
                    {
                        text: "Прикоснуться к девушке",
                        energyCost: 5,
                        isFree: false,
                        marker: "Lover",
                        points: 1,
                        nextScene:"scene2"
                    },
                    {
                        text: "Ждать неизбежного",
                        energyCost: 3,
                        isFree: false,
                        marker: "Friend",
                        points: 1,
                        nextScene: "scene3"
                    },
                   
                         ]
            },
                    ]
    },

     {
        id: "scene2",
        bg: "morning_scene",
        music: "moonlight",
        nextScene: "scene4",
        dialogues: [
            {
                speaker: " ",
                text: "Собравшись с мыслями ты решаешь взять все в свои руки, ты пытаешься придвинуться к ней, может получится разглядеть ее получше?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: " ",
                text: "Ты буквально вязнешь в этой попытке, но вот ты уже слышишь будильник.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                     
        ]
    },
    {
        id: "scene3",
        bg: "morning_scene2",
        music: "moonlight",
        nextScene: "scene4",
        dialogues: [
            {
                speaker: " ",
                text: "Ты замираешь, закрывая глаза, сдаваясь звону будильника",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              
                     
        ]
    },
     {
        id: "scene4",
        bg: "ggroom_phone",
        music: "moonlight",
        nextScene: "scene5",
        dialogues: [
            {
                speaker: " ",
                text: null,
                charSprite: null,
                shake: null,
                sfx: "alarm_sound",
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Резкий звон будильника бьёт по мозгам, как молоток",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: " ",
                text: "Ты тычешь в экран, заставляя его заткнуться, и падаешь обратно на подушку, но сон уже не вернуть",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              
              
                     
        ]
    },
     {
        id: "scene5",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene6",
        dialogues: [
            {
                speaker: " ",
                text: "Образ девушки продолжает ускользать из памяти, хотя ты часто видишь этот сон",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Чёрт, почему сны всегда обрываются на самом интересном? Как будто кто-то наверху сидит с пультом и ржёт, нажимая «стоп» перед кульминацией",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: " ",
                text: "Оглядываешь комнату, все по прежднему. Утренний свет еле пробивается через зашторенные окна",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: " ",
                text: "Кровать — мятая, одеяло сползло на пол, рядом — стол, заваленный пустыми банками энергетиков",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            }, 
             {
                speaker: " ",
                text: "На столе — старый ноутбук с наклейкой “Zerg Rush”, экран выключен, как и всё здесь. Воздух спёртый, пахнет заброшенной жизнью",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                 {
                speaker: "Ты",
                text: "Серьёзно, это что, закон вселенной? Показать самое вкусное и оборвать на самом интересном? ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
               {
                speaker: "Ты",
                text: "Я даже лица её толком не запомнил. Я все больше понимаю мемы как кто то влюбился в девчонку из сна, а поутру грустит о ней",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
               {
                speaker: " ",
                text: "Ты заставляешь себя встать, ноги касаются холодного линолеума, и комната напоминает тебе, кто ты: айтишник, тонущий в рутине. Ты плетешься в ванную, шлепая босыми ступнями ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              
                     
        ]
    },
    {
        id: "scene6",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene7",
        dialogues: [
            {
                speaker: " ",
                text: "Быстрые сборы, и вот ты уже готов отправится на свою любимую работу",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Ты проверяешь свои карманы, и рюкзак, что не забыл ничего важно, как слышишь за дверью голоса",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: [
                    {
                        text: "Посмотреть в глазок",
                        energyCost: 5,
                        isFree: false,
                        marker: "Stalker",
                        points: 1,
                        nextScene:"scene7"
                    },
                    {
                        text: "Отбросить опасения",
                        energyCost: 3,
                        isFree: false,
                        marker: "Friend",
                        points: 1,
                        nextScene: "scene8"
                    },
                   
                         ]
                
            },
             
              
                     
        ]
    },
    {
        id: "scene7",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene9",
        dialogues: [
            {
                speaker: " ",
                text: "Ты смотришь в глазок и видишь в коридоре молодую девушку и парня с планшетом. Он что то активно рассказывает и показывает девушке, которая почти безучастно смотрит по сторонам",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                      
                        
        ]
    },
     {
        id: "scene8",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene9",
        dialogues: [
            {
                speaker: " ",
                text: "Ты хватаешь щеколду и решительным движением открываешь дверь",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                      
                        
        ]
    },
    {
        id: "scene9",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene10",
        dialogues: [
            {
                speaker: " ",
                text: "Твоя лестничная клетка, типичная для многоквартирных домов. Твоя дверь смотрит на дверь соседа, а с другой стороны небольшая лестница, ведущая к лифту.  Холодный  свет ламп заливает площадку, придавая всему унылый вид",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Парень в рубашке и с планшетом ведет стандартный рассказ о твоем чудесном доме и прекрасной планировке, похоже это риелтор",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
                {
                speaker: " ",
                text: "Ты никогда не был в этой квартире, но почти наверняка она ничем не отличается от твоей",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
                {
                speaker: " ",
                text: "Цепляешь пару фраз пока закрываешь свою дверь",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
                {
                speaker: "Риелтор",
                text: "Как видите планировка очень удобная, квартира хоть и маленькая, зато сам дом удобно расположен",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
                {
               speaker: "Риелтор",
                text: "Рядом находится метро, зеленая ветка идет прямо до центра города",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
                {
                speaker: " ",
                text: "Теперь когда дверь закрыта ты можешь получше рассмотреть девушку",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
                {
                speaker: " ",
                text: "Короткие тёмные волосы, в черной короткой юбке и белой блузке с расстегнутыми пуговицами",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
             {
                speaker: " ",
                text: "Немного вульгарно для офиса, закрадывается мысль в твоей голове",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
               {
                speaker: "Девушка",
                text: "Зевает, перебивая, голос тёплый и отсутсвующий. Да-да, я поняла, планировка, всё такое",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
             {
                speaker: " ",
                text: "Девушка замечает тебя и оживляется",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
             {
                speaker: "Девушка",
                text: "О, привет! Ты, похоже мой новый будущий сосед сосед? Расскажи, как тут жить? Слышимость норм, или каждый чих через стену сылшно?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
             {
                speaker: "Ты",
                text: "Неловко, поправляя рюкзак. Ну, э-э…",
                charSprite: null,
                shake: null,
                sfx: null,
                choices:null,
                
            },
             {
                speaker: "Девушка",
                text: "Улыбается шире, поправляя волосы. Серьёзно, сосед, не тушуйся, что скажешь про дом, район, как тут живется?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: [
                    {
                        text: "Рассказать подробнее",
                        energyCost: 5,
                        isFree: false,
                        marker: "Friend",
                        points: 1,
                         nextScene: "scene10"
                    },
                    {
                        text: "Пошло пошутить",
                        energyCost: 3,
                        isFree: false,
                        marker: "Lover",
                        points: 1,
                        nextScene: "scene11"
                    },
                    {
                        text: "Коротко ответить",
                        energyCost: 0,
                        isFree: true,
                        marker: null,
                        points: 1,
                        nextScene: "scene12"
                     },
                         ]    
            },
                     
        ]
    },
     {
        id: "scene10",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene13",
        dialogues: [
            {
                speaker: "Ты",
                text: "Дом нормальный. Парк рядом, если гулять любишь. Круглосуточный магаз через дорогу. Слышимость слабая, соседей не слышно",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Девушка",
                text: "Хихикает, наклоняясь чуть ближе, блузка натягивается. Круто. Значит, можно петь в душе, и никто не пожалуется?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Ты",
                text: "Усмехается. Если не слишком громко, то да",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Риелтор",
                text: "Вздыхает, теребя планшет. Эм, могу показать санузел, если готовы",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
               {
                speaker: "Ты",
                text: "Ну санузел слышно не будет",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Девушка",
                text: "Роняя смешок. Ну хоть на этом спасибо!",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            
                      
                        
        ]
    },
    {
        id: "scene11",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene13",
        dialogues: [
            {
                speaker: "Ты",
                text: "Слышимость слабая, но если будешь петь в душе, я бы послушал",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: " ",
                text: "Девушка закатывает глаза а после игриво улыбается",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Девушка",
                text: "Ого, сосед, да ты смелый. Прям под дверью караулить будешь?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Ты",
                text: "Ну, если ты не пригласишь посмотреть",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                {
                speaker: " ",
                text: "Смеётся, наклоняясь ближе, демонстрируя декольте",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                {
                speaker: "Девушка",
                text: "Смотри, я могу быть громкой. Не спугнись если позову на концерт в первый ряд",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: " ",
                text: "Риелтор кашляет, теребя галстук",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
               {
                speaker: "Риелтор",
                text: "Эм, насчет кухни…",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Девушка",
                text: "Игриво. Запомню тебя, сосед, спасибо что разрядил мне обстановку",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                      
                        
        ]
    },
    {
        id: "scene12",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene13",
        dialogues: [
            {
                speaker: "Ты",
                text: "Спешу, извини. Дом норм, жить можно",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: " ",
                text: "Пожимает плечами, но улыбается",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Девушка",
                text: "Окей, занятой. А говорили что соседи приветливые, обращаясь к риэлтору",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Риелтор",
                text: "Так, давайте зайдем, покажу кухню…",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                  {
                speaker: "Девушка",
                text: "К риелтору, но взгляд на тебе. Да-да, идём",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },    
                        
        ]
    },
     {
        id: "scene13",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene14",
        dialogues: [
            {
                speaker: " ",
                text: "Ты продолжил свой путь к лифту, как слышищшь как тебя окликает девушка",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Девушка",
                text: "Ну, сосед, если останусь, готов к новенькой?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: "Ты",
                text: "Киваешь. Ага, увидимся",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                 
            {
                speaker: "Девушка",
                text: "Улыбаясь. Естественно. Кстати как тебя зовут?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                 
             {
                speaker: " ",
                text: "Введите Имя",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },

              {
                speaker: "Девушка",
                text: "Ладно, продолжим осмотр",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: " ",
                text: "Пока ты ждешь лифт слышишь, как девушка и риелтор заходят в квартиру, её каблуки цокают, голоса затихают",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                      
                        
        ]
    },
     {
        id: "scene14",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene15",
        dialogues: [
            {
                speaker: " ",
                text: "Шагаешь, утопая в мыслях. Взрослая жизнь — это не то, о чём мечтал в юности. Все ждут, что вот-вот начнётся что-то новое, волнующее, неизведанное",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Девушка",
                text: "И оно начинается: счета за квартиру, походы за продуктами, подписки на стриминги, которые ты даже не смотришь. Никто не представляет взрослую жизнь такой",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: "Ты",
                text: "Да, есть бары, караоке, друзья, но и это не вечно. Один обзаводится семьёй, другой уезжает, и вот ты, в пятницу вечером, пялишься в экран, пересматривая матчи по StarCraft ’97 или видео, где лопаются сто шаров, сброшенных с десятого этажа",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                        
        ]
    },
     {
        id: "scene15",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene16",
        dialogues: [
            {
                speaker: " ",
                text: "Спускаешься в метро. Кто-то любит его за возможность остаться наедине с собой, но ты не из таких. Метро — это зеркало, где отражается бессмысленность",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Девушка",
                text: "Толпа, бесконечный поток людей, спешащих заработать, чтобы прожить ещё пару дней. Все — винтики, и ты — один из них",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: "Ты",
                text: "Ещё пара станций — и ты у работы. VuTelegrafix. «Технологии во благо будущего» — звучит красиво, но что ты делаешь в этой компании? ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                 {
                speaker: "Ты",
                text: "Дни проходят за стримами, просмотрами видео  и созвонами, где вы спорите, как нарисовать две параллельные красные  линии синим цветом , пересекающиеся посередине. Абсурд, но это твоя жизнь",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },         
        ]
    },
     {
        id: "scene16",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene17",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Подходя к офису ты встречаешь своего коллегу - Макса. Он хороший парень, и один из немногих людей с кем ты общаешься не только на работе",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: " ",
                text: "Вы знакомы еще со школы, но в юности не общались, а теперь когда ты устроился работать в компанию вы стали, почти друзьями. Макс по утрам всегда бодр,в отличии от тебя",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: "Макс",
                text: "Доброе доброе утро коллега, иронично начинает Макс",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Вы жмете руки, и и улыбаетесь друг другу",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },   
             {
                speaker: "Макс",
                text: "Ну что какой то ты серый в этот понедельник",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },  
             {
                speaker: "Ты",
                text: "А каким мне еще быть? ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },  
             {
                speaker: "Макс",
                text: "Что делал в выходные?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },  
             {
                speaker: "Ты",
                text: "Тоже что и обычно. Посмотрел пару серий, выпил пару пива, по залипал пару часов в телефон",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },  
             {
                speaker: "Макс",
                text: "Да тебе бы другую “пару” найти себе",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },  
             {
                speaker: "Ты",
                text: "Ой не начинай, как моя мама",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },    
            {
                speaker: "Макс",
                text: "Я шучу, не напрягайся",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Ты",
                text: "А у тебя как?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },  
            {
                speaker: "Макс",
                text: "Да нормально, устроили с моей марафон хорроров, потом честно говоря спать было стремно",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },  
            {
                speaker: "Ты",
                text: "Что хорроры были про ипотеку и кредиты?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },  
            {
                speaker: "Макс",
                text: "Не в основном как наматывают кишки 5 часов, хихикая",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },           

            {
                speaker: "Ты",
                text: "Ну разве это хоррор",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },  
            {
                speaker: " ",
                text: "Вы громко смеетесь",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },  
            {
                speaker: "Макс",
                text: "Ладно я пойду заварю кофе и посмотрю что там нам  насыпали по задачам",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },  
        ]
    },
     {
        id: "scene17",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene18",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Это твое рабочее место, Макс сидит рядом с тобой и неплохо разбавляет рутину. Чашка кофе на столе, наушники уже играют расслабляющий микс для работы. Время окунуться в работу",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             
        ]
    },
     {
        id: "scene18",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene19",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Одно новое сообщение",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Текст письма",
                text: "Уважаемые сотрудники! Компания VuTelegrafix напоминает, что мы ведём постоянный мониторинг внутреннего трафика и собираем данные о посещенных вами сайтах с рабочих компьютеров и корпоративной сети Wi-Fi",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Текст письма",
                text: "Если вы получили это письмо, значит, вы нарушаете правила компании, используя технику и сеть в личных целях. Это последнее предупреждение. Мы ожидаем, что вы исправите своё поведение и улучшите профессиональные результаты",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Текст письма",
                text: "С уважением, команда VuTelegrafix",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: " ",
                text: "И вот очередная корпорация призналась что следит за своими пользователями. Работай эффективно либо живи в лесу и молились колесу",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: " ",
                text: " Я последнее время сильно расслабился, и почти забыл об этом. Да они следят.  Каждый клик, каждая вкладка — под их лупой. Знают, что я смотрел...",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: [
                    {
                        text: "Осмотреться",
                        energyCost: 5,
                        isFree: false,
                        marker: "Stalker",
                        points: 2,
                        nextScene: {
                            type: "minigame",
                            key: "SpyGameScene",
                            params: {
                                imageKey: "office_pc_photo_game",
                                minigameId: "spygame1",
                                successSceneId: "scene3",
                                failSceneId: "scene4"
                            }
                        }
                    },
                    {
                        text: "Сбросить стресс",
                        energyCost: 3,
                        isFree: false,
                        marker: "Lover",
                        points: 3,
                        nextScene: "scene5"
                    },
                    {
                        text: "Рассказать максу",
                        energyCost: 10,
                        isFree: true,
                        marker: "Friend",
                        points: 1,
                        nextScene: "scene6"
                     },
   
                      ]
                
                },
                 {
        id: "scene19",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene20",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Ты оглядываешься офис. Кто-то листает TikTok, кто-то прячет экран. Тут ты слышишь звук уведомления с рабочего места макса",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
          
             
        ]
    },
    {
        id: "scene20",
        bg: "ggroom",
        music: "moonlight",
        nextScene: {
                            type: "minigame",
                            key: "SpyGameScene",
                            params: {
                                imageKey: "office_pc_photo_game",
                                minigameId: "spygame1",
                                successSceneId: "scene21",
                                failSceneId: "scene22"
                            }},
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Ты тянешься к его компу что бы закрыть мессенджер и выключить звук, но твой взгляд задерживается на его экране, и в груди загорается любопытство, острое, почти болезненное",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: " ",
                text: "Ты видишь его переписку с девушкой, ты не успеваешь ничего  прочесть как видишь что она писала фото",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
          
             
        ]
    },
     {
        id: "scene21",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene20",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Ты пялишься в экран как завороженный и не можешь отвести взгляд. Ты видел ее пару раз в баре, но никогда не задумывался насколько она красивая",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: " ",
                text: "Слыша шаги за спиной, ты приходишь в себя и резко закрываешь мессенджер и оборачиваешься",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Макс",
                text: "Чего такое",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Ты",
                text: "Ты забыл мессенджер закрыть",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: "Макс",
                text: "Да!??",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
               {
                speaker: "Ты",
                text: "Не парься я все закрыл",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
               {
                speaker: "Макс",
                text: "Спасибо! Ты настоящий друг",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: " ",
                text: "Ты сидишь и делаешь вид, что ничего не было, однако не можешь отпустить ситуацию. Тебе понравилось, что ты видел, и ты с удовольствием посмотрел бы еще. Нет не на девушку макса, а просто посмотрел бы на того, кто об этом не знает. На коллегу, незнакомку или кого угодно",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                 ]
    },
          
            {
        id: "scene22",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene20",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Увлеченно листая переписку, ты не замечаешь как вернулся Макс",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Макс",
                text: "Ты что далешь?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: "Ты",
                text: "Эмм..",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Макс",
                text: "Придурок, свали в туман",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
          
             
        ]
    },
            {
        id: "scene23",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene20",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Ты оглядываешься офис. Кто-то листает TikTok, кто-то прячет экран. Тут ты слышишь звук уведомления с рабочего места макса.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
      
        ]
    },
    {
        id: "scene23",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene24",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Ты оглядываешься офис. Кто-то листает TikTok, кто-то прячет экран. Тут ты слышишь звук уведомления с рабочего места макса.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
      
        ]
    },
    {
        id: "scene23",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene24",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Посмотрев на его экран, ты видишь что этот придурок не закрыл мессенджер прежде чем отойти от компа",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Ты тянешься к его компу что бы закрыть мессенджер и выключить звук, но твой взгляд задерживается на его экране. Ты вчитываешься в его переписку с девушкой",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Пользователь Арин пишет",
                text: "Ты только на работу приехал, ты что дома на меня не насмотрелся",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Пользователь Макс пишет",
                text: "Конечно, уже успел забыть, как ты выглядишь",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "На секунду ты мешкаешься, но потребность в тепле и  заботе,  даже иллюзорной толкает тебя на самый странный шаг. Ты тянешься к клавиатуре, и пишешь так, как бы ты писал своей девушке",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Ты пишешь вместо Макса",
                text: "Арин мы давно с тобой никуда не ходили, все сериалы да еда дома, может выберемся куда то?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "На секунду тебя сжимает от неправильности, но ты решаешь что это просто шутка и ты просто дурачишься",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Пользователь Арин пишет",
                text: "Куда например? ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Ты пишешь вместо Макса",
                text: "Не знаю, я слышал что терраса у монрепо классная, могли бы сходить вместе",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
               {
                speaker: " ",
                text: "На секунду тебя сжимает от неправильности, но ты решаешь что это просто шутка и ты просто дурачишься",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
               {
                speaker: "Пользователь Арин пишет",
                text: "Ой это реально здорово, а когда",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            
            {
                speaker: "Ты пишешь вместо Макса",
                text: "Да хоть завтра, какое вино ты любишь?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Пользователь Арин пишет",
                text: "Я ничего в нем не понимаю",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
               {
                speaker: "Ты пишешь вместо Макса",
                text: "Ну самое время разобраться, представь, мы сидим на террасе и пьем вино из красивых бокалов, смотря на вечерний город, огни загораются, а твоя нога начинает гладить меня по лодыжке, так игриво",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: "Пользователь Арин пишет",
                text: "Ну я точно бы не остановились на лодыжке. Слово еще такое вспомнил",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: "Ты пишешь вместо Макса",
                text: "Тогда мы бы прихватили еще одну бутылку и вернулись бы домой",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Пользователь Арин пишет",
                text: "А там?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Ты пишешь вместо Макса",
                text: "А там ты бы отблагодарила меня как следует",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Пользователь Арин пишет",
                text: "Ну если мы прервем нашу рутину, я бы точно нашла как тебя отблагодарить",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: "Ты пишешь вместо Макса",
                text: "Например?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: "Пользователь Арин пишет",
                text: "Ну например я бы одела свой красный комплект..",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
      
        ]
    },
    {
        id: "scene24",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene25",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Макс хлопает тебя по плечу, и вопросительно на тебя смотрит?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Макс",
                text: "Что тут происходит?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Ты",
                text: "Кажется я устроил тебе романтический вечер",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Макс",
                text: "Кто тебя вообще просил лезть в мои переписки?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Ты",
                text: "Да я просто пошутить хотел",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Макс",
                text: "Прекрасная шутка",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Макс",
                text: "Макс выхватывает мышку и закрывает мессенджер",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
      
        ]
    },
    {
        id: "scene25",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene26",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Ты оглядываешься офис. Кто-то листает TikTok, кто-то прячет экран. Тут ты слышишь звук уведомления с рабочего места макса.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
      
        ]
    },
    {
        id: "scene26",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene27",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Посмотрев на его экран, ты видишь что этот придурок не закрыл мессенджер прежде чем отойти от компа. Ты тянешься к его компу что бы закрыть мессенджер и выключить звук",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
               {
                speaker: " ",
                text: "Приходит еще одно сообщение приходит, но быстро закрываешь мессенджер. Ты выше того, что бы читать чужие переписки",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Только ты отодвигаешься от компа, как возвращается Макс",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
      
        ]
    },
    {
        id: "scene27",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene28",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Макс",
                text: "Я так спешил что бы закрыть тут мессенджер",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Ты",
                text: "Да я закрыл",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Макс",
                text: "Вижу! Спасибо!",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Ты",
                text: "Да не за что, тебе там кто то писал, уведомление на весь офис орало",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Макс",
                text: "Жесть",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Ты",
                text: "Ага, видел письмо?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Макс",
                text: "Да мне тоже прилетело, что получается на работе надо работать?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Ты",
                text: "Получается так, а тебя не бесит что они следят за нами?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Макс",
                text: "А ты бы не стал следить?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Ты",
                text: "Не знаю… А ты?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Макс",
                text: "Я бы не стал точно, это вопрос доверия. Да и зачем мне знать кто что смотрит если он выполняет свою работу?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: "Ты",
                text: "А мы выполняем?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
             {
                speaker: "Макс",
                text: "А чем мы тут занимается?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
                {
                speaker: " ",
                text: "Вы оба громко засмеялись, так что на вас обратили внимание все вокруг. Вы сделали вид что ничего не было",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
      
        ]
    },

     {
        id: "scene25",
        bg: "ggroom",
        music: "moonlight",
        nextScene: "scene26",
        dialogues: [
            {
                speaker: null,
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
            {
                speaker: " ",
                text: "Ты смотришь в свой монитор, немного потерянным взглядом. Гнетущее ощущение слежки давит на тебя, ты никогда не испытывал подобных эмоций, ты знал что мир так устроен как будто всегда, но теперь этот факт просто огорошил тебя",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
                
            },
              {
                speaker: " ",
                text: "Думаешь о том письме, и пытаешься вспомнить, что ты такого странного мог смотреть на работе? Ничего не приходит в голову, но одна мысль продолжает роиться в голове. Ты был бы сам не против посмотреть что делают другие?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: [
                    {
                        text: "Узнать о цифровой слежке",
                        energyCost: 5,
                        isFree: false,
                        marker: "Stalker",
                        points: 2,
                       nextScene: "scene6"
                    },
                 
                    {
                        text: "Отбросить мысли",
                        energyCost: 10,
                        isFree: true,
                        marker: null,
                        points: 1,
                        nextScene: "scene6"
                     },
   
                      ]
                
            },
      
        ]
    },



             
 
    




                     ]
            },
];