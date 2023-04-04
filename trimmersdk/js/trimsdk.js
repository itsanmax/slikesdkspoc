class TrimmerSDK {
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
  
    async verifyUser() {
        try {
            const response = await fetch(this.apiBase + `/api.json?service=media&action=usrdetail&token=${this.token}&flag=auth&env=${this.env}`);
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
  
    launchTrimmer(id,callback,parentElem) {
        try {
            if (!id) {
                console.log('Missing argument(s) Please Pass the slike id');
                return;
            }
            this.iframe = document.createElement("iframe");
            this.iframe.src = this.apiBase +`/mediadamnew?act=publish&_id=${id}&mediaflag=1&token=${this.token}&iframe=true`
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
          } catch (error) {
            console.log(`Error: ${error}`);
            return error; // return the result of the API call
          }
    }

    close() {
        if (this.iframe !== null) {
          // code to remove the iframe
          this.iframe.parentNode.removeChild(this.iframe);
          this.iframe = null;
        }
      }
}
    
  /**
//intialization of sdk
//sso-token parameter1  //stg for staging sso and  prod for production sso parameter 2
const mySDK = new TrimmerSDK("c80bf795ace74abe8dc8816a4b1f8d92","prod");
 
//dev for qc server and prod or left out without any parameter for prduction server 
mySDK.setApiBase('dev');  

mySDK.verifyUser().then((result) => {
    return result.json();
 }).then((data) => {
    if(data.code ==200) {
        //parameter 1 is slike id 
        //parameter 2 is callback function to recive response
        let parentElem = document.getElementById("trim-container");
        mySDK.launchTrimmer("1x8ps7b9ok",myfunc,parentElem);
    }else{
        console.error(data)
    }

 })
//  let parentElem = document.getElementById("trim-container");
//  mySDK.launchTrimmer("1x8ps7b9ok",myfunc,parentElem);

 function myfunc(data){
    console.log("see the response",data)
    mySDK.close()
 }

// mySDK.close()
 */