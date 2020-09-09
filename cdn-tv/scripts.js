function Run(string msg) {
    try {
        Device.CallCSharp(msg); //<-- executes C# code
    }
    catch(err) {
        alert(err);
    }
}
