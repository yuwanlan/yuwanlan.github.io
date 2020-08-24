setTimeout(function() {
    console.log('1');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('2');
        resolve();
    }).then(function() {
        console.log('4')
    })
})

setTimeout(function() {
    console.log('5');
    new Promise(function(resolve) {
        console.log('6');
        resolve();
    }).then(function() {
        console.log('8')
    })
    process.nextTick(function() {
      console.log('7');
  })
})