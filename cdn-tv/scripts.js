function Run(x) {
    try {
      //  Device.CallCSharp(); //<-- executes C# code
        alert(x);
    }
    catch(err) {
        alert(err);
    }
}
