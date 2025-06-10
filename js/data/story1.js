const story1Dialogues = [
    {
        id: "scene1",
        bg: "morning_scene3",
        music: "moonlight",
        nextScene: "scene2",
        dialogues: [
            {
                speaker: " ",
                text: "Я вижу этот сон не в первый раз",
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
              
                     
        ]
    },
    
];