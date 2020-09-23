module.exports = async (func, options) => {
    let error;

    const sleep = (milliseconds) => {
        const date = Date.now();

        let currentDate = null;

        while (currentDate - date < milliseconds) currentDate = Date.now();
    }

    for (let i = 1; i <= options.retries; i++) {
        try {
            return await func();
        } catch (err) {
            sleep(options.ms);
            error = err;
        }
    }

    throw { retryingTimes: options.retries, error };
};
