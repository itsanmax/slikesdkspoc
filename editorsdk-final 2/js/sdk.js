class MySDK {
    constructor(token,tokentype) {
      this.iframe = null;
      this.token = token;
      this.env = tokentype;
      this.connection = null;
      this.setApiBase(); // Set the default API base
    }

    setApiBase(config ='prod') {
      if (config == 'dev') {
        this.apiBase = 'http://172.29.123.110:8841';
      } else {
        this.apiBase = 'https://cms.slike.in';
      }
    }

    close() {
      if (this.iframe !== null) {
        // code to remove the iframe
        this.iframe.parentNode.removeChild(this.iframe);
        this.iframe = null;
      }
    }
  
    launch(arg ,callback,parentElem) {
      if(this.connection !== null){
          this.iframe = document.createElement("iframe");
          this.iframe.src = this.apiBase + `/livetv-editor?token=${this.token}&type=${arg.type}&channelid=${arg.livetvid}&rec_id=${arg.recid}&iframe=true`
          if (parentElem && parentElem instanceof Element) {
            parentElem.appendChild(this.iframe);
          } else {
            document.body.appendChild(this.iframe);
          }
          this.iframe.style.height="100vh"
          this.iframe.style.width="100%"
          window.addEventListener('message', function(e) {
              callback(e.data)
          }, false);
      }else{
        console.log("verify user first");
        return;
      }
    }

    async connect() {
        try {
          const response = await fetch(this.apiBase + `/api.json?service=media&action=usrdetail&token=${this.token}&flag=auth&env=${this.env} `);
          if (response.ok) {
            this.connection = true;
            return response; // return the result of the API call
          } else {
            return response; // return the result of the API call
          }
        } catch (error) {
          console.log(`Error: ${error}`);
          return false; // return the result of the API call
        }
      }
  }
  
/**
//intialization of sdk
//sso-token parameter1  //stg for staging sso and  prod for production sso parameter 2
 const sdk = new MySDK("c80bf795ace74abe8dc8816a4b1f8d92","prod");

 //dev for qc server and prod or left out without any parameter for prduction server 
 sdk.setApiBase('dev');  
 
 //to verify user exist and valid or not
 sdk.connect().then((result) => {
    return result.json();
 }).then((data) => {
  if (data.code ==200) {
    console.log("see user data",data)

      let arg={
          livetvid :"n1pg6lggl9",
          recid : "KYj9D4cBY84W4PYI723V",
          // recid:"1679601684",
          // type :"alert",   
          type :"clip"   //alert time //clip rec
      }
      let parentElem = document.getElementById("my-container");
      //launch method with required argument and callback function
      sdk.launch(arg,mycallback,parentElem);
  } else {
      console.log("Failed to verify user",data);
    }
    })

    //callback function to get the final data after video process
    function mycallback(data){
        console.log("added slike id is",data)
    }

    //close method to close the sdk
  //  sdk.close()

   */