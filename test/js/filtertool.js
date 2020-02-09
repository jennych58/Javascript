  require([
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/dijit/PopupTemplate",
    "esri/dijit/Legend",
    "dojo/_base/array",
    "dojo/on",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/domReady!"
  ], function(
    Map, 
    FeatureLayer, 
    PopupTemplate, 
    Legend,
    array,
    on,
    dom,
    domConst
    
  ) {

    var map = new Map("viewDiv", {
      basemap: "gray-vector",
      center: [ -85.20127, 35.12355 ],
      zoom: 1
    });

    // Add layer to the map

    var serviceUrl = "https://services2.arcgis.com/C8EMgrsFcRFL6LrL/arcgis/rest/services/HISAProjects_WFL1/FeatureServer/0?token=YpbF4nsIB3GuSbWIhgwXbWczDf8K5hPtyHvhd9tOsM2DH_H5h6XtKDa-QnCwSgFbuRM9Ys49M5u3Q6kxshkFwT3b1piPsaqqYDliPnZ3iHXmT6mt0vul77BFD2TtdU-K_11qvpDFZ8nrt4dSKnD_q1D-G7aV97yTAsYdcD4-iUiMhEZqc8IAErCkuf86rXdOZXXeOdZuHNP8Yr0S5KY-gf3k7LIt6XalyiZPyZ2439c";
    var layer = new FeatureLayer(serviceUrl, {
      outFields: [ "FY", "HISAProjects_final_1262017_cs_2", "HISAProjects_final_1262017_csv1", "HISAProjects_final_1262017_cs_4", "HISAProjects_final_1262017_cs_5", "HISAProjects_final_1262017_csv_", "HISAProjects_final_1262017_cs_3", "HISAProjects_final_1262017_cs_1", "HabitatData12_4_17_ProjectNum"],
		
	  
	  
      infoTemplate: new PopupTemplate({
        title: "{HISAProjects_final_1262017_cs_4}",
        description: "<br />Lead PI: {HISAProjects_final_1262017_cs_5}"
          + "<br />Region: {HISAProjects_final_1262017_csv_}"
          + "<br />Year: {FY}"
          + "<br />Primary Habitat Type: {HISAProjects_final_1262017_cs_2}"
          + "<br />Secondary Habitat Type: {HISAProjects_final_1262017_cs_3}"
          + "<br />Distance from shore: {HISAProjects_final_1262017_csv1}"
          + "<br />Secondary Distance from shore: {HISAProjects_final_1262017_cs_1}"

          //
         // "Learn more.." link connected to individual main-areaCard info windows
         
          
      })
    });
    
    console.log(layer.constructor);
    console.log(layer);
    console.log("graphics", layer.graphics);
    console.log("fields", layer.fields);
    console.log("feature ", Array.isArray(layer.graphics));	
	// array.map(layer.graphics, function(gra){
		// var projectNum = gra.attributes.HabitatData12_4_17_ProjectNum;
		// console.log("gra: ", gra);
		
	// });    
	var layerGraphics = layer.graphics;
	console.log(layer.graphics[0]);
	layerGraphics.forEach(function(gra){
		var projectNum = gra.attributes.HabitatData12_4_17_ProjectNum;
		console.log(projectNum);
		console.log("hi");
	});

    
    map.addLayer(layer);
    var legend = new Legend({
        map: map,
        layerInfos: [{
          layer: layer,
          title: "Habitat Type"
        }]
      }, "legendDiv");



    // "Global" Variables
    var filter1 = document.getElementById("filterhabitat");
    var filter2 = document.getElementById("filterlocation");
    var filter3 = document.getElementById("filteryear");  
    var button = document.getElementById("button");

    map.on("load", function(evt){
      legend.startup();
      button.addEventListener("click", function(e){
        // console.log(filter1.options[filter1.selectedIndex].value);
        // console.log(filter2.options[filter2.selectedIndex].value);
        // console.log(filter3.options[filter3.selectedIndex].value);
        habitatValue = filter1.options[filter1.selectedIndex].value;
        distanceValue = filter2.options[filter2.selectedIndex].value;
        yearValue = filter3.options[filter3.selectedIndex].value;
        pushValues(habitatValue, distanceValue, yearValue);
        
      });
    }); //end of map event function

    function pushValues (habitatValue, distanceValue, yearValue){
      var expressionArray = [];

      if (habitatValue) {
        var str = `HISAProjects_final_1262017_cs_2 = '${habitatValue}'`;    
        expressionArray.push(str);
      }
      
      if (distanceValue) {
        var str = `HISAProjects_final_1262017_csv1 = '${distanceValue}'`;
        expressionArray.push(str);
      }

      if (yearValue) {
        var str = `FY = '${yearValue}'`;
        expressionArray.push(str);
      }
      
      console.log(expressionArray);

      var definitionExpression = expressionArray.join(' AND ');

      updateDefinitionExpression(definitionExpression);
    }

   function updateDefinitionExpression(definitionExpression){ 
   		console.log("layer1", layer);    
      //var definitionExpression = "HISAProjects_final_1262017_cs_2 = 'PELAGIC' AND FY = '2010'";
      layer.setDefinitionExpression(definitionExpression);
      console.log(definitionExpression);
      map.infoWindow.hide(); 
      	console.log("layer", layer.graphics);
		window._graphics=layer.graphics;
		
				

		
		// console.log(layer.graphics.attributes.HabitatData12_4_17_ProjectNum);
		// console.log(layerGraphics[0]);
        
     	
		}//end updateDefinitionExpression function
		 console.log("feature layer", layer.constuctor); 
		 var arrValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		
		  
	    var doubleValue = array.map(arrValues, function(item){
	      // return item * 2;
	      console.log("item", item);
	      console.log("item*2", item*2);
	    });
  
  });// end Function
