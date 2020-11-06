const { fromObject } = require("@nativescript/core");
// const { convertHSLToRGBColor } = require("@nativescript/core/css/parser");
const axios = require("axios/dist/axios").default;

async function onNavigatingTo(args) {
    const page = args.object;
    let episodeName;
    let episodeCreateDate;
    let episodeE;
    let characterAPIs = [];
    let characters = [];
    await axios.get("https://rickandmortyapi.com/api/episode/8").then((r) => {
        characterAPIs = r.data.characters;
        episodeName = r.data.name;
        episodeCreateDate = r.data.air_date;
        episodeE = r.data.episode;
        // 
    }).catch((e) => {
        console.log(e);
    });
    await Promise.all(characterAPIs.map(async (character) => {
        await axios.get(character).then((r) => {
            characters.push(r.data);
        });
    }));
    const viewModel = fromObject({
        eName: episodeName,
        eDate: episodeCreateDate,
        eEpisode: episodeE + " " + "Characters",
        characters: characters
    });
    page.bindingContext = viewModel;
    // console.log(characters.length)
}
exports.onNavigatingTo = onNavigatingTo;


function onItemTap(args) {
    const id = args.view.id;
    const listView = args.object;
    const page = listView.page;
    page.frame.navigate({
        moduleName: "pages/character-details/character-details-page",
        context: {
            c: id,
        },
        animated: true,
        transition: {
            name: "slide",
            duration: 300,
            curve: "ease"
        }
    });
}
exports.onItemTap = onItemTap;
