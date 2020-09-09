function Run(x) {
    try {
       Device.CallCSharp(x); //<-- executes C# code
           }
    catch(err) {
        alert(err);
    }
}
