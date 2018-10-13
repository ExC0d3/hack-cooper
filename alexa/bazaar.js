/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a sample skill built with Amazon Alexa Skills nodejs
 * skill development kit.
 * This sample supports multiple languages (en-US, en-GB, de-GB).
 * The Intent Schema, Custom Slot and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-howto
 **/

'use strict';

const Alexa = require('alexa-sdk');
const dealList = [["Two coffees for one", "Half price on eggs", "Thirty percent off sneakers", "Free kids meals", "Clearance sale"], 
        ["Starbucks", "Your Local Grocery", "Shoes for Less","Favorite Restaurant","Best Store in Town"], [.3,.4,.6,.63,.7]];
let dealNum = 0;

const APP_ID = 'amzn1.ask.skill.d164e49c-0e37-4e7b-a554-8b307fa1be56'; // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            SKILL_NAME: 'Bazaar',
            WELCOME_MESSAGE: "Welcome to Bazaar. Go ahead, ask to see deals near you!",
            WELCOME_REPROMPT: 'Please either ask to see deals or to change your settings.',
            STOP_MESSAGE: 'Thank you for using Bazaar!',
            DEAL_NOT_FOUND_MESSAGE: "I\'m sorry, I see no deals near you.",
            DEAL_NOT_FOUND_REPROMPT: 'What else can I help with?',
        },
    },
};

const handlers = {
    //Use LaunchRequest, instead of NewSession if you want to use the one-shot model
    // Alexa, ask [my-skill-invocation-name] to (do something)...
    'LaunchRequest': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE');
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMPT');

        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'GetDealsIntent': function () {
        if (dealNum < 5){
            let dealStore = dealList[1][dealNum];
            let dealTitle = dealList[0][dealNum];
            let dealDistance = dealList[2][dealNum];
            this.attributes.speechOutput = this.t(dealStore + " is giving a deal called " + dealTitle + " and is " + dealDistance + " miles away. Do you want this deal?");
            this.attributes.repromptSpeech = this.t("Do you want the deal from " + dealStore + "?");
        }
        else{
            this.attributes.speechOutput = this.t("There are no more deals. If you want me to restart the list of deals, just let me know.");
            this.attributes.repromptSpeech = this.t("Please either tell me to restart the list of deals or ask exit the skill.")
        }
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
        
    },
    'NextDealIntent': function() {
        dealNum++;
        this.emit('GetDealsIntent');
    },
    'ChooseDealIntent': function() {
        this.attributes.speechOutput = this.t("You have just saved money with Bazaar! Please tell me to keep looking for deals or to exit the skill.");
        this.attributes.repromptSpeech = this.t("Please tell me to keep looking for deals or to exit the skill.");
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'RestartListIntent': function() {
        dealNum = 0;
        this.emit('GetDealsIntent');
    },
    'RepeatIntent': function () {
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        console.log(`Session ended: ${this.event.request.reason}`);
    },
    'Unhandled': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};