const fromObject = require("tns-core-modules/data/observable").fromObject;
const axios = require("axios").default;

async function onNavigatingTo(args) {
    const page = args.object;
    const context = page.navigationContext;
    const cImage = page.getViewById("image");
    const cName = page.getViewById("name");
    const cStatus = page.getViewById("status");
    const cSpecies = page.getViewById("species");
    const cGender = page.getViewById("gender");
    await axios.get("https://rickandmortyapi.com/api/character/" + context.c).then((response) => {
        cImage.src = response.data.image;
        cName.text = response.data.name;
        cStatus.text = response.data.status;
        cSpecies.text = response.data.species;
        cGender.text = response.data.gender;
    }).catch(function (error) {
        console.log(error);
    })
}
exports.onNavigatingTo = onNavigatingTo;

function onBackButtonTap(args) {
    const view = args.object;
    const page = view.page;

    page.frame.goBack();
}

exports.onBackButtonTap = onBackButtonTap;