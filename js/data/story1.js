const story1Dialogues = [
    {
        id: "scene1",
        bg: "morning_scene",
        music: "moonlight",
        nextScene: "scene2",
        dialogues: [
            {
                speaker: "Девушка",
                text: "Туман обволакивает, густой, почти живой, будто мир растворяется в молочной дымке. В центре — она",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: [
                             {
                         text: "Запустить шпионскую камеру",
                         energyCost: 5,
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
      text: "Пропустить",
      energyCost: 0,
      nextScene: "scene2"
    }
  ]
            },
            {
                 speaker: " ",
                text: "Тёмные волосы струятся по плечам, зелёные глаза горят, как изумруды",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                 speaker: " ",
                text: "Тонкие пальцы расстегивают блузку, пуговица за пуговицей, и ткань скользит вниз, обнажая кожу, бледную, как лунный свет",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Её движения медленные, но в них — вызов, хищная грация. Она смотрит прямо на тебя, улыбка касается губ, и голос, низкий, обволакивающий, шепчет ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: "Девушка",
                text: "Тише, я сделаю все сама",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Она наклоняется ближе, и её дыхание, кажется, касается твоей кожи. Но туман сгущается, образ дрожит, и мир обрывается, как кинолента, застрявшая в проекторе ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            
               ]
    },

     {
        id: "scene2",
        bg: "ggroom",
        music: "map_memory",
        nextScene: "scene3",
        dialogues: [
            {
                speaker: " ",
                text: "Резкий звон будильника iPhone вонзается в тишину, как нож. Глаза распахиваются, но сон ускользает, оставляя лишь жар в груди и смутное чувство потери",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
              {
                speaker: " ",
                text: "Комната тонет в сером полумраке: мятая кровать, стол с пустыми банками пива, ноутбук с потертой наклейкой StarCraft",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Одинокий носок на полу — символ хаоса, который ты давно перестал замечать",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
              {
                speaker: " ",
                text: "Опять утро. Опять эта серая карусель, где дни — копии друг друга. Работа, пиво, экран. Иногда кажется, что жизнь — это чей-то глючный код, а я — баг, который никто не фиксит. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Ты плетешься в ванную, чистишь зубы, глядя на своё отражение — усталое, с тенью щетины. Серую рубашку надеваешь почти ритуально, как доспехи. Рюкзак на плечо, ключи звякают в кармане.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            
        ]
    },
     {
        id: "scene3",
        bg: "city_street",
        music: "map_memory",
        nextScene: "scene4",
        dialogues: [
            {
                speaker: " ",
                text: "Шагаешь, утопая в мыслях. Взрослая жизнь — это не то, о чём мечтал в юности. Все ждут, что вот-вот начнётся что-то новое, волнующее, неизведанное",
                charSprite: "null",
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "И оно начинается: счета за квартиру, походы за продуктами, подписки на стриминги, которые ты даже не смотришь. Никто не представляет взрослую жизнь такой. Да, есть бары, караоке, друзья, но и это не вечно. ",
                charSprite: "null",
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: " Один обзаводится семьёй, другой уезжает, и вот ты, в пятницу вечером, пялишься в экран, пересматривая матчи по StarCraft ’97 или видео, где лопаются сто шаров, сброшенных с десятого этажа. ",
                charSprite: "null",
                shake: null,
                sfx: null,
                choices: null
            },
              
        ]
    },
         {
        id: "scene4",
        bg: "metro_people",
        music: "map_memory",
        nextScene: "scene5",
        dialogues: [
            {
                speaker: " ",
                text: "Спускаешься в метро. Кто-то любит его за возможность остаться наедине с собой, но ты не из таких.",
                charSprite: "null",
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Ещё пара станций — и ты у работы. VuTelegrafix. «Технологии во благо будущего» — звучит красиво, но что ты делаешь в этой компании?",
                charSprite: "null",
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: " Дни проходят за стримами, TikTok и созвонами, где вы спорите, как нарисовать две красные паралельные линии синем цветом, пересекающиеся посередине. Абсурд, но это твоя жизнь.  ",
                charSprite: "null",
                shake: null,
                sfx: null,
                choices: null
            },
              
        ]
    },
    {
        id: "scene5",
        bg: "office",
        music: "map_memory",
        nextScene: "scene6",
        dialogues: [
            {
                speaker: " ",
                text: "Переступаешь порог, и стеклянные двери отражают твоё усталое лицо. Запах кофе и гул голосов встречают тебя, как старые знакомые. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Ещё один день, ещё один… Сеп… Ладно, забыл, как там было ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Звуки шагов, гул компьютеров, приглушённые разговоры. Офис бурлит утренней жизнью: коллеги снуют с кофе, обсуждают сплетни",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Новый альбом какого-то артиста, который забудется через неделю. «Круто, я лайкнула!» — доносится чей-то голос. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Пустой трёп. Включаешь стрим по StarCraft, открываешь список задач и пытаешься погрузиться в работу",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            
            
        ]
    },
     
    {
        id: "scene6",
        bg: "office_pc",
        music: "stalker_terror",
        nextScene: "scene7",
        dialogues: [
            {
                speaker:  "  ",
                text: "Внезапно — резкий сигнал уведомления",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: "  ",
                text: "Одно новое сообщение. Отрываешься от телефона и открываешь письмо.  ",
                charSprite:  null,
                shake:  null,
                sfx: "click",
                choices: null
            },
            {
                speaker: "Текст письма",
                text: "Уважаемые сотрудники! Компания VuTelegrafix напоминает, что мы ведём постоянный мониторинг внутреннего трафика и собираем данные о посещенных вами сайтах с рабочих компьютеров и корпоративной сети Wi-Fi.  ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null,
            },
            {
                speaker: "Текст письма",
                text: "Если вы получили это письмо, значит, вы нарушаете правила компании, используя технику и сеть в личных целях. Это последнее предупреждение.",
                charSprite:  null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: "Текст письма",
                text: "Мы ожидаем, что вы исправите своё поведение и улучшите профессиональные результаты. С уважением, команда VuTelegrafix.   ",
                charSprite:  null,
                shake: null,
                sfx: "click",
                choices: null
            },
               {
                speaker: " ",
                text: "Проще говоря: «Мы следим за тобой, лентяй, начинай работать, или вылетишь». ",
                charSprite:  null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Личная жизнь? Тайна переписки? Кому это интересно? Ты либо эффективный винтик, либо живи в лесу и молись колесу",
                charSprite:  null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Они следят. Каждый клик, каждая вкладка — под их лупой. Знают, что я смотрел... И что? Это моя жизнь! Но в груди что то съежилось",
                charSprite:  null,
                shake: null,
                sfx: null,
                choices: null
            },
                   {
                speaker: " ",
                text: "Хотя мне бы тоже было бы интресно посмотреть чем заняты мои коллеги на работе. Не думаю что все идеально исполняют свои обязанности «идеально» ",
                charSprite:  null,
                shake: null,
                sfx: null,
                choices: null
            },
                    {
                speaker: " ",
                text: " ",
                charSprite:  null,
                shake: null,
                sfx: null,
                choices: [
                    {
                        text: "Осмотреться",
                        energyCost: 10,
                        nextScene: "scene7",
                        nextDialogue: null,
                    },
                    {
                        text: "Игнорировать",
                        energyCost: 5,
                        nextScene: "scene8",
                        nextDialogue: null,
                    }
                    ]
            },
        ]
    },
    {
        id: "scene7",
        bg: "office",
        music: "map_memory",
        nextScene: "scene9",
        dialogues: [
            {
                speaker: " ",
                text: "Ты оглядываешься офис. Шум клавиатур, запах кофе, кто-то листает TikTok, кто-то поспешно сворачивает вкладки.  ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Твой взгляд цепляется за экран стажёра — долговязого парня в мятой футболке, который сидит через два стола. Его мессенджер открыт, и там, в чате, мелькает фото: девушка в чёрном кружевном белье, снятое в полумраке спальни.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Ты замираешь, усмешка трогает губы. Все под колпаком, но этот парень — либо смельчак, либо идиот.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Фото — как удар тока, и в груди вспыхивает что-то острое, почти болезненное. Это не просто картинка, это чужая тайна, лежащая на виду, и ты можешь её взять. Сердце колотится, ладони холодеют, но ты делаешь вид, что тянешься за кружкой.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Мысли кружат, как мотыльки: кто она? Почему он так рискует? Офис уже не кажется серой клеткой — это лабиринт, полный секретов, и ты хочешь в него нырнуть. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            
            
        ]
    },
     {
        id: "scene9",
        bg: "office_pc",
        music: "map_memory",
        nextScene: "scene10",
        dialogues: [
            {
                speaker: " ",
                text: "Ты замечаешь, как стажёр встаёт и идёт к кулеру, оставив компьютер без присмотра. Экран светится, мессенджер всё ещё открыт, и фото девушки будто зовёт тебя. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Ты оглядываешься: никто не смотрит, офис гудит своей рутиной. Пальцы дрожат, но ты подкатываешь своё кресло ближе к его столу, делая вид, что роешься в бумагах. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Ты замираешь, усмешка трогает губы. Все под колпаком, но этот парень — либо смельчак, либо идиот.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Чат открыт, и ты прокручиваешь переписку вверх.Сообщения мелькают:  ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "— Скинула тебе кое-что. Нравится?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "— Ого, ты серьёзно? Ещё давай!",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "— Это только для тебя",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "Выше — ещё фото",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            
            
        ]
    },
    {
        id: "scene10",
        bg: "sexphoto_office",
        music: "map_memory",
        nextScene: "scene11",
        dialogues: [
               {
                speaker: " ",
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Она в том же белье, но теперь поза откровеннее, рука тянется к краю ткани, и свет лампы подчеркивает изгибы. Ты чувствуешь, как горло пересыхает, а сердце стучит так громко, что кажется, его услышат все. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Азарт — как наркотик, и ты не можешь остановиться. Ты прокручиваешь дальше, видя ещё одно сообщение:",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "-Снимаю для тебя прямо сейчас..",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                       
            
        ]
    },
     {
        id: "scene11",
        bg: "office_pc",
        music: "map_memory",
        nextScene: "scene14",
        dialogues: [
            {
                speaker: " ",
                text: "Внезапно тень падает на экран.  ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: "Стажер",
                text: "Эй, ты чё делаешь?",
                charSprite: "workguy_angry",
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Его голос — как хлыст, и ты вздрагиваешь, чуть не опрокинув кресло. Дима стоит над тобой, его лицо — смесь злости и паники. Твои щёки горят, мысли мечутся, как загнанные звери",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Да я... просто... бумагу искал. Упала тут где-то",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                   {
                speaker: "Стажер",
                text: "Бумагу? Серьёзно? В моём чате? ",
                charSprite: "workguy_angry",
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: "Стажер",
                text: "Он хватает мышку, сворачивает мессенджер, но его руки дрожат. Ты встаёшь, бормоча что-то невнятное, и отступаешь к своему столу. Коллеги вокруг ничего не заметили",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: "Стажер",
                text: "Ты чувствуешь их взгляды, как иглы. Дима бросает на тебя ещё один взгляд — не злой, а какой-то... настороженный, и возвращается к работе.  ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "Ты сидишь за своим столом, но кровь всё ещё шумит в ушах. Фото девушки, её поза, слова в чате — всё это впечаталось в память, как выжженное клеймо. Ты чувствовал себя вором, и тебя поймали, но это не стыд",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Это-то другое — пьянящий риск, который манит ещё сильнее. Дима теперь будет следить за тобой, и ты это знаешь. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Нужно быть осторожнее, двигаться тише, смотреть незаметнее. Офис уже не просто место работы — это шахматная доска, и ты сделал первый ход.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            
            
        ]
    },

     {
        id: "scene8",
        bg: "office",
        music: "map_memory",
        nextScene: "scene12",
        dialogues: [
            {
                speaker: " ",
                text: " Ты закрываешь письмо, бормоча: Похер. Но осадок остаётся. Они следят, и это бесит.  Ты пытаешься сосредоточиться на стриме, но мысли путаются.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Ты откидываешься на стуле, пялясь в экран, где зерглинги рвут терранов в клочья, но знакомые звуки StarCraft не заглушают раздражение.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: " Письмо — как заноза, засевшая под кожей: они знают, что ты смотрел, и эта мысль липнет, как мокрый асфальт после дождя. Ты — винтик в их системе, и это бесит, но лезть в их игры кажется слишком рискованным.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Вместо этого ты тянешься к телефону, пальцы сами открывают браузер. Любопытство — не азарт, а что-то тише, но настойчивое — толкает тебя копнуть глубже, но осторожно, не оставляя следов",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             
            
            
        ]
    },
    {
        id: "scene12",
        bg: "phone_hand",
        music: "map_memory",
        nextScene: "scene13",
        dialogues: [
              {
                speaker: " ",
                text: "Ты переключаешь телефон на мобильный интернет, отключая Wi-Fi — на всякий случай, офисная сеть под колпаком. В голове крутится мысль: VuTelegrafix следит за тобой, как они это делают? ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                  {
                speaker: " ",
                text: "Ты открываешь браузер в режиме инкогнито и находишь анонимный форум, где айтишники и любители тёмных уголков интернета обсуждают трекеры, логи и шпионские программы.  ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Заголовки тем манят: Как компании следят за сотрудниками, Анализ трафика: что видят админы, Тор и VPN — мифы и правда",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Ты листаешь посты, сердце слегка ускоряет ритм. Один юзер, с ником ShadowByte, пишет: “Любой клик в корпоративной сети — это лог. Они видят всё: сайты, время, даже поисковые запросы. Хотите скрыться? Используйте Tor, но не палитесь на рабочих девайсах.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Другой, DataGhost, добавляет: “Слежка — это не только софт. Камеры, кейлоггеры, даже твой телефон может сдать. Проверяйте, что качаете.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                  {
                speaker: " ",
                text: "Ты читаешь дальше, и в груди шевельнулось что-то новое — не страх, а странное возбуждение. Это как заглянуть за кулисы: мир, где каждый шаг отслеживается, но где можно научиться прятаться.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                    {
                speaker: " ",
                text: "Или... следить самому. Ты находишь тему про то, как хакеры перехватывают данные: кто-то хвастается, как взломал соседский Wi-Fi, кто-то делится туториалом по анализу трафика.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                     {
                speaker: " ",
                text: "Это не твой уровень — ты просто айтишник, а не киберпанк из фильмов, — но информация затягивает, как детектив.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            
            
        ]
    },
    {
        id: "scene13",
        bg: "office",
        music: "map_memory",
        nextScene: "scene16",
        dialogues: [
            {
                speaker: " ",
                text: " Ты оглядываешься: офис гудит, коллеги заняты своими экранами, никто не смотрит. Но ладони всё равно холодеют, и ты прячешь телефон в карман, когда мимо проходит тимлид.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Это не паранойя, просто... осторожность. Ты не готов лезть в тёмные дебри интернета, не сейчас, но мысль о том, что можно узнать чужие секреты — или спрятать свои, — оседает в голове, как песок на дне реки.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: " Ты возвращаешься к своему столу, но стрим уже не цепляет. Форумы открыли дверь в мир, где слежка — это игра, и ты можешь быть не только жертвой, но и игроком. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Ты не готов действовать, но любопытство — как семя, которое уже пустило корни. Ты представляешь, как листаешь чьи-то чаты, видишь их фото, их тайны, и это будоражит",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "Но тревога шепчет: один неверный шаг, и ты сам под прицелом. Офис кажется тем же, но теперь ты видишь его иначе — как сеть, где каждый оставляет следы, и ты можешь научиться их читать.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Они следят, и это бесит, но я не дурак, чтобы лезть напролом. Эти форумы... они как карта чужого мира.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "Я пока только смотрю, но, чёрт, это затягивает. Узнать, как они это делают, как спрятаться, как... увидеть больше. Но осторожно. Я не хочу быть тем, кого поймают.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             
            
            
        ]
    },

     {
        id: "scene14",
        bg: "metro_people",
        music: "map_memory",
        nextScene: "scene15",
        dialogues: [
            {
                speaker: " ",
                text: "Рабочий день окончен и  ты  спускаешься в метро. Толпа обволакивает, как липкий туман. Шум вагонов, запах пота и духов, мелькающие лица. Мысли накрывают с головой. Ты не можешь перестать думать о том письме с работы",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Следят. Все следят за всеми. Корпорации, соседи, девушки за парнями, родители за детьми. Самое противное — не знаешь, что именно знает компания. Просто ссылки на сайты? Или они делают скриншоты? Ты ведь ничего такого не смотрел…",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Ну, почти. На имиджбордах чего только не встретишь: отрубленные головы, аварии, любительское порно, видео, где мужик сел на банку. Усмехаешься.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Интересно было бы посмотреть что делают другие? К примеру мой начальник, вечно трезвый, спортивный, пьющий какую-то тину вместо кофе",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "что прячется у него в телефоне? Порно с фурри? Или что похуже?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: " А вот взять к примеру людей в вагоне? Слева от тебя толстый, потный мужик, что может скрывать?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "Может он донатит вебкам-девушкам чтобы те называли его папочкой ?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             
            
            
        ]
    },

     {
        id: "scene15",
        bg: "girl_with_phone",
        music: "map_memory",
        nextScene: "scene16",
        dialogues: [
            {
                speaker: " ",
                text: "А девушка слева, подтянутая, но скромно одетая, не удивлюсь что она  фоткает ноги для фетишистов ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Вагон дергается, и твой взгляд падает на её телефон.Горло пересыхает, сердце колотится. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: " На экране мелькнуло пару интересных фотографий. Ничего не разобрать, только кусок ягодицы и голые ноги.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Сообщения мелькают и все что ты успеваешь увидеть четко",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: "Сообщение",
                text: "— Неплохо, а есть ещё фото?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: " ",
                charSprite:  null,
                shake: null,
                sfx: null,
                choices: [
                    {
                        text: "Присмотреться",
                        energyCost: 10,
                        nextScene: "scene19",
                        nextDialogue: null,
                    },
                    {
                        text: "Отвести взгляд",
                        energyCost: 5,
                        nextScene: "scene21",
                        nextDialogue: null,
                    }
                    ]
            },
            
            
        ]
    },
     {
        id: "scene16",
        bg: "metro_people",
        music: "map_memory",
        nextScene: "scene17",
        dialogues: [
            {
                speaker: " ",
                text: "Рабочий день окончен и  ты  спускаешься в метро. Толпа обволакивает, как липкий туман. Шум вагонов, запах пота и духов, мелькающие лица. Мысли накрывают с головой. Ты не можешь перестать думать о том письме с работы",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Следят. Все следят за всеми. Корпорации, соседи, девушки за парнями, родители за детьми. Самое противное — не знаешь, что именно знает компания. Просто ссылки на сайты? Или они делают скриншоты? Ты ведь ничего такого не смотрел…",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Ну, почти. На имиджбордах чего только не встретишь: отрубленные головы, аварии, любительское порно, видео, где мужик сел на банку. Усмехаешься.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Интересно было бы посмотреть что делают другие? К примеру мой начальник, вечно трезвый, спортивный, пьющий какую-то тину вместо кофе",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "что прячется у него в телефоне? Порно с фурри? Или что похуже?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: " А вот взять к примеру людей в вагоне? Слева от тебя толстый, потный мужик, что может скрывать?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "Может он донатит вебкам-девушкам чтобы те называли его папочкой ?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             
            
            
        ]
    },
     

     {
        id: "scene17",
        bg: "girl_with_phone",
        music: "map_memory",
        nextScene: "scene18",
        dialogues: [
            {
                speaker: " ",
                text: "А девушка слева, подтянутая, но скромно одетая, не удивлюсь что она  фоткает ноги для фетишистов ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Вагон дергается, и твой взгляд падает на её телефон.Горло пересыхает, сердце колотится. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: " На экране мелькнуло пару интересных фотографий. Ничего не разобрать, только кусок ягодицы и голые ноги.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Сообщения мелькают и все что ты успеваешь увидеть четко",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: "Сообщение",
                text: "— Неплохо, а есть ещё фото?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: " ",
                charSprite:  null,
                shake: null,
                sfx: null,
                choices: [
                    {
                        text: "Подглядеть",
                        energyCost: 10,
                        nextScene: "scene22",
                        nextDialogue: null,
                    },
                    {
                        text: "Отвести взгляд",
                        energyCost: 5,
                        nextScene: "scene21",
                        nextDialogue: null,
                    }
                    ]
            },
            
            
        ]
    },

     {
        id: "scene19",
        bg: "girl_with_phone",
        music: "map_memory",
        nextScene: "scene20",
        dialogues: [
            {
                speaker: " ",
                text: "Вчитываешься. Как будто мир подмигнул тебе, подбросив странное чувство не реальности.Твой взгляд прилипает к экрану, как к магниту, и ты жадно ловишь каждое слово, каждый пиксель.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Девушка описывает подруге свой последний секс: как они они познакомились в лифте, а на следующий вечер уже срывали друг с друга одежду в том же лифте ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: " Потом перебрались к ней домой, и она расписывает, как он прижал её к стене, как всё было быстро и жёстко. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Она кидает еще одно фото — она повернута к камере спиной, и понемногу спускает свою маленькие трусики.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                          
            
        ]
    },
    {
        id: "scene20",
        bg: "sexphoto_metro",
        music: "map_memory",
        nextScene: "scene18",
        dialogues: [
            {
                speaker: " ",
                text: null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Ты смотришь в ее экран, пока поезд не прибывает на очередную остановку и девушка не начинает выходить из вагона.  ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: " Жар заливает грудь, как горящий виски, ты продолжаешь смотреть на то место где сидела девушка, и растворяешься в этом новом ощущении, как в пустоте, отрешенный от всего происходящего. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: " Вагон дёргается, вновь начиная движение. но ты не здесь —  тебя уже поглотили новые эмоции. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                          
            
        ]
    },
     {
        id: "scene21",
        bg: "metro_people",
        music: "map_memory",
        nextScene: "scene18",
        dialogues: [
            {
                speaker: " ",
                text: null,
                charSprite: "Ты утыкаешься взглядом в потёртый пол вагона, Ты не хотел подглядывать, но мир будто подталкивает: смотри, бери, это так просто",
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "А что, если бы кто-то лез в твой телефон, читал твои сообщения? Ты бы взорвался",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "  Эта мысль — как холодный душ, остужает тебя, ты лучше этого ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: " Иначе от чего ты так злишься на то, что компания анализирует твой трафик на работе и следит что бы ты поменьше бездельничал",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                          
            
        ]
    },
    {
        id: "scene22",
        bg: "girl_with_phone",
        music: "map_memory",
        nextScene: "scene18",
        dialogues: [
            {
                speaker: " ",
                text: null,
                charSprite: "Не подавая вида, ты начинаешь наискось пялиться в ее экран.  Вагон трясёт, и ты успеваешь поймать только кусок  еще пары  фото — голое плечо и край кружевного белья",
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: "Подруга",
                text: "Огонь, кидай ещё!",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Чат движется слишком быстро, сообщения мелькают, и ты не успеваешь ничего разобрать",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: " Поезд прибывает на станцию, и девушка поднимает голову, ища глазами путь на выход из вагона, как вдруг замечает что ты продолжаешь пялиться ей в экран.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                   {
                speaker: "Девушка",
                text: "Изварещенец",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "Выкрикивает, она бросив на тебя взгляд, полный презрения и спешно покидает вагон, прижав телефон к груди",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Ты отворачиваешься, чувствуя себя идиотом, и лёгкий укол разочарования грызёт. Ты ждал чего-то большего, но увидел лишь обрывок",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Вагон гудит, но ты сидишь с этим чувством — смесь неловкости и зуда, который шепчет: в следующий раз будь осторожнее.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               
                          
            
        ]
    },

     {
        id: "scene23",
        bg: "girl_with_phone",
        music: "Home_enter",
        nextScene: "scene18",
        dialogues: [
            {
                speaker: " ",
                text: null,
                charSprite: "Вечер. Город утопает в сером полумраке, асфальт источает сырость, фонари отбрасывают тусклые тени. У подъезда припаркован белый фургон, разгружающий коробки.",
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Новые соседи?",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Фургон с визгом уезжает, оставив у входа хаотичную кучу: картонные коробки, торшер в рваном целлофане и хрупкую девушку ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Она наклоняется за очередной коробкой, и её короткие шорты натягиваются, обрисовывая бёдра и изгиб попы так, что воздух в лёгких застревает",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                   {
                speaker: " ",
                text: "Изварещенец",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "Тёмные волосы, выбившиеся из хвоста, падают на её лицо, обтягивающая майка липнет к телу, подчёркивая грудь, и капли пота блестят на её коже, как бриллианты.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Ты не можешь отвести взгляд — её движения гипнотизируют, разжигая азарт",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text:  null,
                charSprite: null,
                shake: null,
                sfx: null,
                choices: [
                    {
                        text: "Помочь",
                        energyCost: 10,
                        nextScene: "scene24",
                        nextDialogue: 3
                    },
                    {
                        text: "Наблюдать",
                        energyCost: 5,
                        nextScene: "scene2",
                        nextDialogue: 4
                    }
                ]
            },
         
        ]
    },
      {
        id: "scene23",
        bg: "girl_with_phone",
        music: "map_memory",
        nextScene: "scene18",
        dialogues: [
            {
                speaker: " ",
                text: null,
                charSprite: "Ты подходишь, чувствуя, как кровь пульсирует в висках, и нажимаешь кнопку домофона",
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Девушка выглядывает из-за коробки, и её зелёные глаза — острые, как лезвия, — цепляют тебя. Её губы трогает смущённая улыбка, обнажая ямочку на щеке.",
                charSprite:  'mia_tshirt_shy',
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: "Девушка",
                text:  "Спасибо! Можно ещё придержать дверь лифта? Я почти всё подняла на этаж, хочу забрать остальное за раз",
                charSprite: 'mia_tshirt_shy',
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Её голос — как шёлк, с лёгкой хрипотцой от усталости, и он проникает под кожу.",
                charSprite:  'mia_tshirt_shy',
                shake: null,
                sfx: null,
                choices: null
            },
                   {
                speaker: "Ты",
                text: "Без проблем.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "Ты нажимаешь кнопку лифта, удерживая двери, и наблюдаешь, как она таскает коробки. Каждый её наклон — как кадр из сна: шорты обтягивают попу, майка задирается, обнажая талию, и пот стекает по её коже, оставляя влажный след. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Ты сглатываешь, горло пересохло, и пальцы сами тянутся к телефону. Когда она наклоняется в очередной раз, ты делаешь снимок",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             
         
        ]
    },
    {
        id: "scene24",
        bg: "home_hall_box",
        music: "map_memory",
        nextScene: "scene18",
        dialogues: [
            {
                speaker: " ",
                text: null,
                charSprite: "Ты подходишь, чувствуя, как кровь пульсирует в висках, и нажимаешь кнопку домофона",
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Девушка выглядывает из-за коробки, и её зелёные глаза — острые, как лезвия, — цепляют тебя. Её губы трогает смущённая улыбка, обнажая ямочку на щеке.",
                charSprite:  'mia_tshirt_shy',
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: "Девушка",
                text:  "Спасибо! Можно ещё придержать дверь лифта? Я почти всё подняла на этаж, хочу забрать остальное за раз",
                charSprite: 'mia_tshirt_shy',
                shake: null,
                sfx: null,
                choices: null
            },
                 {
                speaker: " ",
                text: "Её голос — как шёлк, с лёгкой хрипотцой от усталости, и он проникает под кожу.",
                charSprite:  'mia_tshirt_shy',
                shake: null,
                sfx: null,
                choices: null
            },
                   {
                speaker: "Ты",
                text: "Без проблем.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
               {
                speaker: " ",
                text: "Ты нажимаешь кнопку лифта, удерживая двери, и наблюдаешь, как она таскает коробки. Каждый её наклон — как кадр из сна: шорты обтягивают попу, майка задирается, обнажая талию, и пот стекает по её коже, оставляя влажный след. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: " ",
                text: "Ты сглатываешь, горло пересохло, и пальцы сами тянутся к телефону. Когда она наклоняется в очередной раз, ты делаешь снимок",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             
         
        ]
    },
   



    //   {
    //     id: "scene6",
    //     bg: "office_pc",
    //     music: "stalker_terror",
    //     dialogues: [
    //         {
    //             speaker: null,
    //             text: "Внезапно — резкий сигнал уведомления",
    //             charSprite: null,
    //             shake: null,
    //             sfx: null,
    //             choices: null
    //         },
    //         {
    //             speaker: "Аня",
    //             text: "Одно новое сообщение. Отрываешься от телефона и открываешь письмо.  ",
    //             charSprite: "mia_tshirt_shy",
    //             shake: "shake",
    //             sfx: "click",
    //             choices: null
    //         },
    //         {
    //             speaker: "Аня",
    //             text: "Пора уходить.",
    //             charSprite: null,
    //             shake: null,
    //             sfx: null,
    //             choices: [
    //                 {
    //                     text: "Уйти быстро",
    //                     energyCost: 10,
    //                     nextScene: "scene2",
    //                     nextDialogue: 3
    //                 },
    //                 {
    //                     text: "Осмотреться",
    //                     energyCost: 5,
    //                     nextScene: "scene2",
    //                     nextDialogue: 4
    //                 }
    //             ]
    //         },
    //         {
    //             speaker: "Аня",
    //             text: "Я ушла, но что-то осталось позади...",
    //             charSprite: "mia_tshirt_shy",
    //             shake: null,
    //             sfx: null,
    //             choices: null
    //         },
    //         {
    //             speaker: "Аня",
    //             text: "Здесь есть подсказка!",
    //             charSprite: "mia_tshirt_shy",
    //             shake: null,
    //             sfx: "click",
    //             choices: null
    //         }
    //     ]
    // }
];