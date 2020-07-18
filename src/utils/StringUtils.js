export default {
    json2FormData(data) {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        return formData;
    },

    checkPhone(phone) {
        let phoneReg = /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/;
        return phone.match(phoneReg);
    },

    isEmpty(obj, flag) {
        if (obj === 'null' || obj == 'undefined' || !obj) {
            return true
        }
        if (flag) {
            if (Array.isArray(obj) && !obj.length) {
                return true
            }
            if (typeof obj === 'object') {
                for (var key in obj) {
                    return false// 返回false，不为空对象
                }
                return true
            }
        }
        return false
    },

    deepClone(source) {
        if (!source && typeof source !== 'object') {
            throw new Error('error arguments', 'deepClone')
        }
        let targetObj = source.constructor === Array ? [] : {}
        Object.keys(source).forEach(keys => {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = this.deepClone(source[keys])
            } else {
                targetObj[keys] = source[keys]
            }
        })
        if (Object.prototype.toString.call(source) === '[object Date]') {
            targetObj = new Date(source.getTime())
        }
        return targetObj
    },
    formaterTime(timestamp, format) {
        if (!timestamp) return "";
        if (!format) {
            format = 'yyyy-MM-dd hh:mm:ss'
        }
        timestamp = parseInt(timestamp)
        let realDate = new Date(timestamp)
        function timeFormat(num) {
            return num < 10 ? '0' + num : num
        }
        let date = [
            ['M+', timeFormat(realDate.getMonth() + 1)],
            ['d+', timeFormat(realDate.getDate())],
            ['h+', timeFormat(realDate.getHours())],
            ['m+', timeFormat(realDate.getMinutes())],
            ['s+', timeFormat(realDate.getSeconds())],
            ['q+', Math.floor((realDate.getMonth() + 3) / 3)],
            ['S+', realDate.getMilliseconds()]
        ]

        let regYear = new RegExp('(y+)', 'i')
        let reg1 = regYear.exec(format)
        if (reg1) {
            format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length))
        }
        for (let i = 0; i < date.length; i++) {
            let k = date[i][0]
            let v = date[i][1]

            let reg2 = new RegExp('(' + k + ')').exec(format)
            if (reg2) {
                format = format.replace(reg2[1], reg2[1].length == 1
                    ? v : ('00' + v).substring(('' + v).length))
            }
        }
        return format
    },
    versionCompare(newVersion, oldVersion) {
        var newArr = newVersion.toString().split('.')
        var oldArr = oldVersion.toString().split('.')

        var vlength =
            newArr.length > oldArr.length ? newArr.length : oldArr.length

        for (var i = 0; i < vlength; i++) {
            if (oldArr[i] == undefined) {
                return true
            } else if (newArr[i] == undefined) {
                return false
            }

            var newN = newArr[i]
            var oldN = oldArr[i]

            var nlength = newN.length > oldN.length ? newN.length : oldN.length

            if (newN.length < nlength) {
                newN = '0'.repeat(nlength - newN.length) + newN
            } else if (oldN.length < nlength) {
                oldN = '0'.repeat(nlength - oldN.length) + oldN
            }

            newN = newN.split('')
            oldN = oldN.split('')

            for (var j = 0; j < nlength; j++) {
                if (newN[j].localeCompare(oldN[j]) == 1) {
                    return true
                } else if (newN[j].localeCompare(oldN[j]) == -1) {
                    return false
                }
            }
        }
        return false
    },


    filterPrice(amount = 0, digist = 2) {
        amount = parseFloat(amount);
        // amount = amount / 100;
        if (isNaN(amount)) {
            return 0;
        } else if ((amount + '').indexOf('.') == -1) {
            return parseInt(amount)
        } else if (amount == 0) {
            return amount.toFixed(digist);
        } else {
            var strArr = amount.toString().split('.');
            var decimalStr;
            if (strArr[1] == undefined) {
                strArr[1] = '0'.repeat(digist);
            } else if (strArr[1].length < digist) {
                strArr[1] = strArr[1] + '0'.repeat(digist - strArr[1].length);
            }
            decimalStr = strArr[1].substr(0, digist);
            return `${strArr[0]}\.${decimalStr}`;
        }
    }

}
