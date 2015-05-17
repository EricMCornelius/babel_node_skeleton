async function throw_exception() {
  throw new Error('error');
}

async function mapped(arr, func) {
  return await* arr.map(func);
}

async function wait(time) {
  return new Promise((resolve) => {
    setTimeout(function() {
      resolve(time * 1000);
    }, 1000 * time);
  });
}

async function exec() {
  try {
    await throw_exception();
  }
  catch(err) {
    console.error(err.message);
  }
  return await mapped([0.1, 0.2, 0.3], wait);
}

function destructure({first = 1, second = 2} = {}) {
  return first * second;
}

module.exports = {
  exec: exec,
  destructure: destructure
};
