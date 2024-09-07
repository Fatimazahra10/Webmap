require (["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/PopupTemplate"],
function(esriConfig, Map, MapView, FeatureLayer, PopupTemplate){

esriConfig.apiKey="AAPK81509221ae8b49458f20b53d523169c9coujw2sbl-hg3Xp3n_AkIv4ds64xLz-pGXxEuyHfyq-qlcQgDa_DqDjVXtItHzTO";

const map=new Map({

    basemap: "streets-vector",
    
});

const view=new MapView({

    map: map,
    center: [-7.62, 33.59], // Longitude, latitude
    zoom: 9, // Zoom level
    container: viewdiv
});

var popupCommune = new PopupTemplate({

    title: "<b>Commune: {COMMUNE_AR}</b>",
    content:"<ul> <li> PREFECTURE : {PREFECTURE} </li>" + "<li> Communes : {COMMUNE_AR} </li> " + "<li> Surface : {Shape_Area} </li> </ul>"
    
    });

const communes=new FeatureLayer({
    url: "https://services8.arcgis.com/X2RU58Upr78r0DXy/arcgis/rest/services/communes_de_casablanca/FeatureServer/0",
    outFiealds: ["PREFECTURE", "COMMUNE_AR", "Shape_Area"],
    popupTemplate: popupCommune
})
map.add(communes);




var popupPopulation=new PopupTemplate({
    title: "<b>Population de : {ARRONDISSE}</b>",
    content: [{
        type: "media",
         mediaInfos: [{
           type: "column-chart",
           caption: "Statistiques de Casablanca",
           value: {
             fields: [ "TOTAL1994","TOTAL2004" ],
             normalizeField: null,
             tooltipField: ""
             }
           }]
       }]

});

var popupVoirie=new PopupTemplate({
    title: "Voirie de Casablanca",
    content:[{
        type: "fields",
        fieldInfos:[
            {
            "fieldName" : "NOM",
            "label": "",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
        },
        {
            "fieldName" : "LENGTH",
            "label": "Longueur",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": {
                "places": 1,
                "digitSeparator": true
              },
            "stringFieldOption": "text-box"
        },
        ]
    }]


});

const voirie=new FeatureLayer({
    url: "https://services8.arcgis.com/X2RU58Upr78r0DXy/arcgis/rest/services/voirie_casa/FeatureServer/0",
    popupTemplate: popupVoirie
})
map.add(voirie);

const population=new FeatureLayer({
    url: "https://services8.arcgis.com/X2RU58Upr78r0DXy/arcgis/rest/services/population_de_casablanca/FeatureServer/0",
    popupTemplate: popupPopulation
})
map.add(population);

});