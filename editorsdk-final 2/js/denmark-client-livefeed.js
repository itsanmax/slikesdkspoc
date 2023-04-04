/**
 * @author: sandeep.gupta1@timmesinternet.in
 * @desc: Code added for use in Denmark UI for Live Feed video editing. POC done as per the 
 * provided editor SDK(sdk.js) by Slike Team
 */
this.slikeSdkObj = null;
this.slikeUserObj = false;
this.launchLiveTvElem = null;
this.launchClipElem = null;
this.createdSlikeId = null;

window.onload = (event) => {
    console.log('window loaded....');

    this.launchLiveTvElem = document.getElementById("launch-livetv");
    this.launchClipElem = document.getElementById("launch-clip");

    // init Slike SDK and connect user
    initSlikeSdk();


    this.launchLiveTvElem.onclick = () => {
        console.log("== Launch live TV: slike init, connect, and load...");
        // initSlikeSdk();
        this.slikeSdkObj.close();
        launchLiveTv();
    };

    this.launchClipElem.onclick = () => {
        this.slikeSdkObj.close();
        console.log("== Launch live TV for clip: ");
        let livetvid = document.getElementById("livetvid").value;
        let recid = document.getElementById("recid").value;
        console.log("== livetvid: " + livetvid + " === recid: " + recid);
        // livetvid :"n1pg6lggl9",
        //recid : "evqaIocBNqBLemQ1nu5I",
        let arg = {
            livetvid: livetvid,
            recid: recid,
            // recid:"1679601684",
            // type :"alert",   
            type: "clip"   //alert time //clip rec
        };
        launchLiveTv(arg);
    }



};

enableButtons = () => {
    this.launchLiveTvElem.disabled = false;
    this.launchClipElem.disabled = false;
}
enableNextSteps = (slikeId) => {
    this.createdSlikeId = slikeId;
    alert("Created Slike ID: " + this.createdSlikeId);
    document.getElementById("next-step-btn").disabled = false;
}

initSlikeSdk = () => {
    //intialization of sdk
    //sso-token parameter1  //stg for staging sso and  prod for production sso parameter 2
    this.slikeSdkObj = new MySDK("ec5c8b64a83144dfbff3fd789b18966a", "stg");
    //dev for qc server and prod or left out without any parameter for prduction server 
    this.slikeSdkObj.setApiBase('dev');

    connectSdk();
}

connectSdk = () => {
    //to verify user exist and valid or not
    this.slikeSdkObj.connect().then((result) => {
        return result.json();
    }).then((data) => {
        if (data.code == 200) {
            console.log("see user data", data);
            this.slikeUserObj = data;
            enableButtons();
            //   launchLiveTv();
        }
        else {
            console.log("Failed to verify user", data);
        }
    })

}



// http://172.29.123.110:8841/livetv-editor?token=ec5c8b64a83144dfbff3fd789b18966a&type=clip&channelid=n1pg6lggl9&rec_id=KYj9D4cBY84W4PYI723V&iframe=true
/**
 * ANI live service:
 * rec id: evqaIocBNqBLemQ1nu5I , live tv ID: n1pg6lggl9
 * rec id : dvqYIocBNqBLemQ1Ou7Z , live tv ID : n1pg6lggl9
 * 
 * ANI live select:
 * rec id: hfqrIocBNqBLemQ1NO4i, live tv ID: n1fg669glk , Kolkata protest by locals over minor : 3:37 PM, MON, 27 MAR 2023 (02:25)  
 * 
 */
// default with sdk : recid : KYj9D4cBY84W4PYI723V , livetvid :"n1pg6lggl9",
// type mandatory: alert
launchLiveTv = (arg = {}) => {

    arg.type = "clip";
    let parentElem = document.getElementById("my-container");
    //launch method with required argument and callback function
    this.slikeSdkObj.launch(arg, myCallbackFn, parentElem);
}

myCallbackFn = (data) => {
    console.log("added slike id is ", data);
    if (data) {
        enableNextSteps(data);
    }
    this.slikeSdkObj.close();
}