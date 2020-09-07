function Run() {
    try {
        Device.CallCSharp(); //<-- executes C# code
    }
    catch(err) {
        alert(err);
    }
}
