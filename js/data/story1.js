const story1Dialogues = [
    {
        id: "scene1",
        bg: "elevator",
        music: "pixel_dreaming",
        dialogues: [
            {
                speaker: " ",
                text: "Старый подъезд, облупившаяся зеленая краска на стенах, запах сырости и старого линолеума.Тусклая лампочка мигает, отбрасывая тени на потертый пол",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                 speaker: " ",
                text: "На лестнице — коробки, сумки, легкий аромат цветов витает в воздухе",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
             {
                 speaker: " ",
                text: "Вторник — серый, как асфальт, пропитанный кофе и рутиной. Ты выходишь из квартиры, поправляя рюкзак, и мир вдруг оживает. ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "На лестнице — она. Мия, как гласит надпись на коробках, новая соседка, которая переворачивает твой день с ног на голову. ",
                charSprite: "mia_tshirt_shy",
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Ее шорты облегают бедра, как вторая кожа, а футболка задирается, когда она наклоняется, открывая талию и край черного кружевного белья, тонкого, как паутина, дразнящего, как тайна.",
                charSprite: "mia_tshirt_shy",
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Ее темные волосы струятся по шее, и каждая прядь — как приглашение прикоснуться. Она замечает тебя, выпрямляется, и ее улыбка — как вспышка света в сером подъезде ",
                charSprite: "mia_tshirt_shy",
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Зеленые глаза блестят, губы приоткрыты, и ты чувствуешь, как кровь стучит в висках, как мир сужается до ее лица, до ее дыхания, которое ты почти слышишь",
                charSprite: "mia_tshirt_shy",
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: "Мия",
                text: "(улыбаясь, голос мягкий, с легкой хрипотцой) Привет! Ты сосед, да? Я Мия. Поможешь с коробками?",
                charSprite: "mia_tshirt_shy",
                shake: null,
                sfx: null,
                choices: [
                    {
                        text: "Помочь",
                        energyCost: 10,
                        nextScene: null,
                        nextDialogue: 9
                    },
                    {
                        text: "Отказаться",
                        energyCost: 5,
                        nextScene: "scene5",
                        nextDialogue: null,
                    }
                ]
            },
            {
                speaker: "Имя",
                text: "(нервно, голос дрожит) А, да, конечно. (Имя). Рад... познакомиться.",
                charSprite: "mia_tshirt_shy",
                shake: null,
                sfx: null,
                choices: null
            },
              {
                speaker: "Мия",
                text: "(игриво, наклоняясь ближе) Уже рад? Осторожно, я могу тебя к этому приучить.",
                charSprite: "mia_tshirt_angry",
                shake: "shake",
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Она реальна? Ее голос, ее кожа... Я хочу коснуться ее, вдохнуть ее аромат. Эта улыбка — как ловушка, и я уже в нее попал. Хочу быть ближе, чем просто сосед.",
                charSprite: "mia_tshirt_shy",
                shake: null,
                sfx: null,
                choices: null
            },
              {
                speaker: " ",
                text: "Я держу коробку, но думаю только о ней. Ее запах, ее тепло... Я уже пропал.",
                charSprite: "mia_tshirt_shy",
                shake: null,
                sfx: null,
                choices: null
            },
               ]
    },

     {
        id: "scene2",
        bg: "elevator",
        music: "groove_tonight",
        dialogues: [
            {
                speaker: " ",
                text: "Мия, на ступеньку выше, шорты облегают ее, и когда она наклоняется за коробкой, ты видишь черное кружевное белье, тонкое, почти прозрачное",
                charSprite: "mia_tshirt_back",
                shake: null,
                sfx: null,
                choices: null
            },
              {
                speaker: " ",
                text: "Ее кожа блестит от пота, и каждый изгиб ее тела — как кадр из твоих фантазий.",
                charSprite: "mia_tshirt_back",
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: " ",
                text: "Ты берешь тяжелую коробку, и Мия идет впереди, ее шаги легкие, как танец. Она на ступеньку выше, и ее шорты — чертовски короткие — колышутся, открывая бедра, гладкую кожу, которая блестит в тусклом свете лампы",
                charSprite: "mia_tshirt_back",
                shake: null,
                sfx: null,
                choices: null
            },
              {
                speaker: " ",
                text: "Она наклоняется за очередной коробкой, и твой взгляд падает вниз, как магнитом. Черное кружевное белье выглядывает из-под шорт, тонкое, облегающее, подчеркивающее каждый изгиб ее тела. ",
                charSprite: "mia_tshirt_back",
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Ты видишь, как ткань натягивается, открывая больше, чем нужно, и представляешь, как твои пальцы скользят по ее коже, следуя за этим кружевом. ",
                charSprite: "mia_tshirt_back",
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Она оборачивается, и ее улыбка — озорная, будто она знает, что ты видел, и ей это нравится. Коробка в твоих руках кажется неподъемной, но ты идешь, потому что хочешь быть рядом. ",
                charSprite: "mia_tshirt_back",
                shake: null,
                sfx: null,
                choices: null
            },
             {
                speaker: " ",
                text: "Она оборачивается, и ее улыбка — озорная, будто она знает, что ты видел, и ей это нравится. Коробка в твоих руках кажется неподъемной, но ты идешь, потому что хочешь быть рядом. ",
                charSprite: "mia_tshirt_back",
                shake: null,
                sfx: null,
                choices: null
            },
              {
                speaker: "Мия",
                text: "(смеется, голос мягкий) Осторожно, (Имя), не урони. Или ты на что-то засмотрелся?",
                charSprite: "mia_tshirt_back",
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: "Имя",
                text: "(краснея, голос хрипит) Н-нет, я... просто коробка тяжелая",
                charSprite: "mia_tshirt_back",
                shake: null,
                sfx: null,
                choices: null
            },
                {
                speaker: "Мия",
                text: "(игриво, наклоняясь ближе) Тяжелая? Или я тебя отвлекаю?",
                charSprite: "mia_tshirt_back",
                shake: null,
                sfx: null,
                choices: null
            },
        ]
    },
     {
        id: "scene3",
        bg: "assshot",
        music: "map_memory",
        dialogues: [
            {
                speaker: "",
                text: "(нервно, голос дрожит) А, да, конечно. (Имя). Рад... познакомиться.",
                charSprite: "null",
                shake: null,
                sfx: null,
                choices: null
            },
             
              
        ]
    },
    {
        id: "scene5",
        bg: "loch",
        music: "stalker_terror",
        dialogues: [
            {
                speaker: "Имя",
                text: "ЛОХ",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            }
        ]
    },
     
    {
        id: "scene6",
        bg: "home",
        music: "map_memory",
        dialogues: [
            {
                speaker: null,
                text: "Как надо",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: "Аня",
                text: "Кто-то здесь!",
                charSprite: "mia_tshirt_shy",
                shake: "shake",
                sfx: "click",
                choices: null
            },
            {
                speaker: "Аня",
                text: "Пора уходить.",
                charSprite: null,
                shake: null,
                sfx: null,
                choices: [
                    {
                        text: "Уйти быстро",
                        energyCost: 10,
                        nextScene: "scene2",
                        nextDialogue: 3
                    },
                    {
                        text: "Осмотреться",
                        energyCost: 5,
                        nextScene: "scene2",
                        nextDialogue: 4
                    }
                ]
            },
            {
                speaker: "Аня",
                text: "Я ушла, но что-то осталось позади...",
                charSprite: "mia_tshirt_shy",
                shake: null,
                sfx: null,
                choices: null
            },
            {
                speaker: "Аня",
                text: "Здесь есть подсказка!",
                charSprite: "mia_tshirt_shy",
                shake: null,
                sfx: "click",
                choices: null
            }
        ]
    }
];