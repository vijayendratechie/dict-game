#!/usr/bin/env node

const axios = require('axios');
let apihost = 'https://fourtytwowords.herokuapp.com';
let api_key = "b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164";

let option = process.argv[2];
let word = process.argv[3];

//DEFINATION OF WORDS
async function defn(word)
{
  let data = await axios.get(apihost+'/word/'+word+'/definitions?api_key='+api_key)
			  .then(function (response) {
			    return (response.data);
			  })
			  .catch(function (error) {
			    // handle error
			    return 0;			    
			  })	
	return data;
};


//RANDOM WORDS
function randomWord()
{
	axios.get(apihost+'/words/randomWord?api_key='+api_key)
	.then(function (response) {
	// handle success
	console.log(response.data);
	})
	.catch(function (error) {
	// handle error
	console.log(error);
	})	
}



//SYNONYMS AND ANTONYMS
async function relatedWords(word,wordtype)
{
  let data = await axios.get(apihost+'/word/'+word+'/relatedWords?api_key='+api_key)
				  .then(function(response) {
				  	
			  		let synwords,antwords;
			  
				  	for(let i=0;i<response.data.length;i++)
					{
						obj = response.data[i];
						//console.log(obj);
						if(obj.relationshipType === 'antonym' && wordtype === 'ant')
						{
							antwords = obj.words;
							return antwords;															
						}
						else if(obj.relationshipType === 'synonym' && wordtype === 'syn')
						{
							synwords = obj.words;
							return synwords;	
						}
					}	
					return 1;
				  	  	
				  })
				  .catch(function (error) {
				    // handle error
				    //console.log(error);
				  	return 0;
				  });
	return data;	
};


//EXAMPLE SENTENCES USING THE WORD
async function examples(word)
{
    let data = await axios.get(apihost+'/word/'+word+'/examples?api_key='+api_key)
			  .then(function (response) {
			    // handle success
			    return (response.data);
			  })
			  .catch(function (error) {
			    // handle error
			   	return 0;
			  });
	return data;		  
};


//TO DISPLAY DEFINATION AND EXAMPLES
function displaySentence(sentencearr)
{
	for(let i=0;i<sentencearr.length;i++)
	{
		console.log((i+1)+") "+sentencearr[i].text);
	}
}

//TO DISPLAY SYNONYMS AND ANTONYMS
function displayRelatedWords(wordsarr)
{
	for(let i=0;i<wordsarr.length;i++)
	{
		console.log((i+1)+") "+wordsarr[i]);
	}
}


async function run()
{
	switch(option)
	{
		case 'defn' : 
		{
			console.log("defn");
	 		if(typeof word === 'undefined')
	 		{
	 			console.log("No Word Entered");
	 		}
	 		else
	 		{
	 			let defination = await defn(word);	
	 			if(defination === 0)
	 			{
	 				console.log("Error while finding defination");	
	 			}
	 			else
	 			{
	 				console.log("Defination of "+word+" are : \n");	
	 				displaySentence(defination);
	 			}
	 			
	 		} 		
	 		break;	
		}
		case 'syn' : 
		{
			console.log("syn");
	 		if(typeof word === 'undefined')
	 		{
	 			console.log("No Word Entered");
	 		}
	 		else
	 		{
	 			let synwords = await relatedWords(word,'syn');	
	 			if(synwords === 0)
	 			{
	 				console.log("Error while finding synonyms");	
	 			}
	 			else if(synwords === 1)
	 			{
	 				console.log("No synonyms for given word");	
	 			}
	 			else
	 			{
	 				console.log("Synonyms are : \n");
	 				displayRelatedWords(synwords);
	 			}
	 			
	 		} 		
	 		break;	
		}
		case 'ant' : 
		{
			console.log("ant");
	 		if(typeof word === 'undefined')
	 		{
	 			console.log("No Word Entered");
	 		}
	 		else
	 		{
	 			let antwords = await relatedWords(word,'ant');	
	 			if(antwords === 0)
	 			{
	 				console.log("Error while finding antonyms");	
	 			}
	 			else if(antwords === 1)
	 			{
	 				console.log("No antonyms for given word");	
	 			}
	 			else
	 			{
	 				console.log("Antonyms are : \n");
	 				displayRelatedWords(antwords);
	 			}
	 		} 		
	 		break;	
		}
		case 'ex' :
		{
			console.log("ex");
			if(typeof word === 'undefined')
	 		{
	 			console.log("No Word Entered");
	 		}
	 		else
	 		{
	 			let ex = await examples(word);
	 			if(ex === 0)
	 			{
	 				console.log("Error while finding examples");	
	 			}
	 			else
	 			{
	 				console.log("Examples for "+word+" are : \n");	
	 				displaySentence(ex.examples);
	 			}
	 		}
	 		break;
		}
		default : 
		{
			if(typeof option !== 'undefined')
			{
				let word = option;
				let defination = await defn(word);
				let synwords = await relatedWords(word,'syn');
				let antwords = await relatedWords(word,'ant');
				let ex = await examples(word);
				if(defination === 0)
				{
					console.log("Error while finding word full dict");
				}
				else if(antwords === 0)
				{

				}
				else
				{

				}
			}
		}	
		break;
	}
}

run();


