'use strict';

String.prototype.format = function () {
    var values = arguments;
    return this.replace(/\{(\d+)\}/g, function (match, index) {
        if (values.length > index) {
            return values[index];
        } else {
            return "";
        }
    });
};

var System = {
	accName: '',
	addr: '',
	priv: ''
};

var is_eth_addr = function is_eth_addr(addr) {
	var re = /^0x[a-fA-F0-9]{40,40}/;
	return re.test(addr);
};

var is_number = function is_number(val) {
	var re = /^([0-9]+)|([0-9]+\.[0-9]+)/;
	return re.test(val);
};

var is_int = function is_int(val) {
	var re = /^[0-9]+/;
	return re.test(val);
};

////////////////////////////////localstorage
var isNew = function isNew() {
	var accs = window.localStorage.getItem('accs');
	if (accs == null) {
		return true;
	}
	return false;
};

var newAcc = function newAcc(name, addr) {
	var accs = window.localStorage.getItem('accs');
	if (accs != null) {
		var obj = JSON.parse(accs);
		obj.users.push({
			name: name,
			addr: addr
		});
		window.localStorage.setItem('accs', JSON.stringify(obj));
	} else {
		var obj = {
			users: [{
				name: name,
				addr: addr
			}]
		};
		window.localStorage.setItem('accs', JSON.stringify(obj));
	}
};

var getAccs = function getAccs() {
	var accs = window.localStorage.getItem('accs');
	if (accs == null) {
		return null;
	}
	return JSON.parse(accs);
};

var nameInAccs = function nameInAccs(name) {
	var accs = getAccs();
	if (accs == null) {
		return false;
	}
	for (var i = 0; i < accs.users.length; i++) {
		if (name == accs.users[i].name) {
			return true;
		}
	}
	return false;
};

var setPriv = function setPriv(addr, priv) {
	window.localStorage.setItem('priv:' + addr, JSON.stringify({
		priv: priv
	}));
};

var getPriv = function getPriv(addr) {
	var priv = window.localStorage.getItem('priv:' + addr);
	if (priv == null) {
		return null;
	}
	var jpriv = JSON.parse(priv);
	return jpriv.priv;
};

var setPass = function setPass(addr, pass) {
	window.localStorage.setItem('pass:' + addr, pass);
};

var getPass = function getPass(addr) {
	return window.localStorage.getItem('pass:' + addr);
};

var getCurrent = function getCurrent() {
	var current = window.localStorage.getItem('curr');
	if (current == null) {
		return null;
	}
	return JSON.parse(current);
};

var setCurrent = function setCurrent(name, addr) {
	var obj = {
		name: name,
		addr: addr
	};
	window.localStorage.setItem('curr', JSON.stringify(obj));
};

var setIndex = function(index) {
	window.localStorage.setItem('index', index)
}

var getIndex = function() {
	var a = window.localStorage.getItem('index')
	if(a == null) {
		return 0;
	}
	return a;
}

var newSent = function newSent(now, from, to, value, hash, tokenType) {
	if(tokenType == "dnp") {
		var txs = localStorage.getItem('txs:' + from);
		var jtxs = [];
		if (txs == null) {
			jtxs = [];
		} else {
			jtxs = JSON.parse(txs);
		}
		jtxs.push({
			time: now,
			to: to,
			value: value,
			hash: hash
		});
		if(jtxs.length >= 100) {
			jtxs.splice(0, 1);
		}
		localStorage.setItem('txs:' + from, JSON.stringify(jtxs));
	} else if(tokenType == "gsp") {
		var txs = localStorage.getItem('gsp_txs:' + from);
		var jtxs = [];
		if (txs == null) {
			jtxs = [];
		} else {
			jtxs = JSON.parse(txs);
		}
		jtxs.push({
			time: now,
			to: to,
			value: value,
			hash: hash
		});
		if(jtxs.length >= 100) {
			jtxs.splice(0, 1);
		}
		localStorage.setItem('gsp_txs:' + from, JSON.stringify(jtxs));
	}
};

var getSents = function getSents(tokenType, from, pageIndex, pageCount) {
	if(tokenType == "ays") {
		var txs = localStorage.getItem('txs:' + from);
		if (txs == null) {
			return [];
		}
		var jtxs = JSON.parse(txs);
		var len = jtxs.length;
		var list = [];
		for (var i = len - 1 - pageIndex * pageCount; i > len - 1 - (pageIndex + 1) * pageCount && i >= 0; i--) {
			list.push(jtxs[i]);
		}
		return list;
	} else if (tokenType == "gsp") {
		var txs = localStorage.getItem('gsp_txs:' + from);
		if (txs == null) {
			return [];
		}
		var jtxs = JSON.parse(txs);
		var len = jtxs.length;
		var list = [];
		for (var i = len - 1 - pageIndex * pageCount; i > len - 1 - (pageIndex + 1) * pageCount && i >= 0; i--) {
			list.push(jtxs[i]);
		}
		return list;
	}
};

var setHash = function(hash) {
	localStorage.setItem('hash:' + hash, '1');
};

var getHash = function(hash) {
	return localStorage.getItem('hash:' + hash);
};

var setLaw = function() {
	localStorage.setItem('law', '1');
}

var getLaw = function() {
	return localStorage.getItem('law');
}

var setOrderPay = function(addr) {
	localStorage.setItem("order_pay_" + addr, '1');
}

var getOrderPay = function(addr) {
	return localStorage.getItem("order_pay_" + addr);
}

////////////////////////////////////////node
var get_gsp_contract = function() {
	//return "0xce3350dcdf7b82a50c4a95dae2c3333b89e0bfd4de86a0"
	return "0xdcdae3342cb6da237b9e3985c26f296b91faf916"
}

var getToFromContractData = function(data) {
	return data.substr(26, 46)
}

var getValueFromContractData = function(data) {
	var val = data.substr(74, 64)
	var tmp = "0x" + val;
	var a = new BigNumber(tmp);
	a = a / (1e18);
	return a.toString();
}

var is_gsp_addr = function(to) {
	if("0x" + to == get_gsp_contract() || to == get_gsp_contract()) {
		return true
	} else {
		return false
	}
} 

var get_url = function get_url() {
	return "http://103.72.167.16:8005";
	//return "http://106.75.139.66:8080";
};

var get_proxy_url = function() {
	return "http://103.72.167.16:9020";
	//return "http://106.75.139.66:9020";
};

var dnp_core = function dnp_core(method, params, cb_succ, cb_fail) {
	if (window.XMLHttpRequest) {
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("POST", get_url());
		httpRequest.setRequestHeader("Content-Type", "application/json");

		var data = JSON.stringify({
			"jsonrpc": "2.0",
			"id": method,
			"method": method,
			"params": params
		});
		
		//alert(data);

		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {

				//console.log(httpRequest.responseText);
				var obj = JSON.parse(httpRequest.responseText);

				//alert(httpRequest.responseText);

				httpRequest.abort();
				//alert(JSON.stringify(obj));
				if (obj.error != null) {
					cb_fail(obj.error.message);
				} else {
					cb_succ(obj.result);
				}
			}
			//alert(JSON.stringify(httpRequest));
		};
		httpRequest.send(data);
	} else {
		cb_fail("连接失败");
	}
};

var dnp_blockNumber = function dnp_blockNumber(cb_succ, cb_fail) {
	dnp_core("ays_blockNumber", [], cb_succ, cb_fail);
};

var dnp_getBalance = function dnp_getBalance(addr, height, cb_succ, cb_fail) {
	dnp_core("ays_getBalance", [addr, height], cb_succ, cb_fail);
};

var dnp_sendtransaction = function dnp_sendtransaction(from, to, value, gas, gasPrice, cb_succ, cb_fail) {
	dnp_core("ays_sendTransaction", [{ "from": from, "to": to, "value": value, "gas": gas, "gasPrice": gasPrice }], cb_succ, cb_fail);
};

var dnp_getTransactionCount = function dnp_getTransactionCount(addr, height, cb_succ, cb_fail) {
	dnp_core("ays_getTransactionCount", [addr, height], cb_succ, cb_fail);
};

var dnp_gasPrice = function dnp_gasPrice(cb_succ, cb_fail) {
	dnp_core("ays_gasPrice", [], cb_succ, cb_fail);
};

var dnp_gasLimit = function (from, to, value, data, cb_succ, cb_fail) {
	dnp_core("ays_estimateGas", [{"from": from, "to": to, "value": value, "data": data}], cb_succ, cb_fail);
};

var dnp_sendRawTransaction = function dnp_sendRawTransaction(sign, cb_succ, cb_fail) {
	dnp_core("ays_sendRawTransaction", [sign], cb_succ, cb_fail);
};

var dnp_getTransaction = function dnp_getTransaction(hash, cb_succ, cb_fail) {
	dnp_core("ays_getTransactionByHash", [hash], cb_succ, cb_fail);
};

var dnp_call_gsp = function(addr, cb_succ, cb_fail) {
	dnp_core("ays_call", [{"to": get_gsp_contract(), "data": genQueryData(addr)}, "latest"], cb_succ, cb_fail)
	//dnp_core("dnp_call", [{"to": get_gsp_contract(), "data": "0x70a08231000000000000000000887db5d6a356545717a3a92ecc448da86d609dcebd"}, height], cb_succ, cb_fail)
}

var dnp_proxy = function(path, param, cb_succ, cb_fail) {
	if(window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", get_proxy_url() + path + "?" + param);
        httpRequest.setRequestHeader("Content-Type", "application/json")
        var data = JSON.stringify(param);
      	httpRequest.send(data);
      	httpRequest.onreadystatechange = function() {
        	if(httpRequest.readyState == 4 && httpRequest.status == 200) {
          		console.log(httpRequest.responseText);
          		var obj = JSON.parse(httpRequest.responseText);
          		if(obj.code != 0) {
          			cb_fail(obj.msg);
          		} else {
          			cb_succ(obj);
          		}
        	}
      	};
    } else {
      	cb_fail("连接失败");
    }
};

var proxyLockInfo = function(tokenType, addr, cb_succ, cb_fail) {
	if(tokenType == "dnp") {
		dnp_proxy("/unlock/info", "addr=" + addr, cb_succ, cb_fail);
	} else if(tokenType == "gsp") {
		dnp_proxy("/gsp_unlock/info", "addr=" + addr, cb_succ, cb_fail);
	}
}

var proxyTxs = function(addr, pageIndex, pageCount, cb_succ, cb_fail) {
	dnp_proxy("/api/txs", "addr=" + addr + "&pageIndex=" + pageIndex + "&pageCount=" + pageCount, cb_succ, cb_fail);
}

////////////////////////////////////
var getLocalTime = function(nS) {
	return new Date(parseInt(nS) * 1000).toLocaleString();
};

var getNowTime = function() {
	return new Date().toLocaleString();
};

var getDay = function(nS) {
	var t = new Date(parseInt(nS) * 1000);
	var year = t.getFullYear();
	var month = t.getMonth() + 1;
	var day = t.getDate();
	return year + "-" + month + "-" + day
};

var calcPlotId = function calcPlotId(addr) {
	//alert(addr);
	var tmp = "0x" + addr.substr(32);
	var a = new BigNumber(tmp);
	return a.toString();
};

////////////////////////////////////
///////////////bignumber
var convertFromAmount = function(data) {
	var tmp = new BigNumber(data);
	tmp = tmp / 1e+18;
	return tmp.toString();
};

var convertFromGasPrice = function(data) {
	var tmp = new BigNumber(data);
	tmp = tmp / 1e+9;
	return tmp.toString();
};

var convertBigNumber = function(data, hex) {
	var tmp = new BigNumber(data);
	if (hex) {
		return "0x" + tmp.toString(16);
	} else {
		return tmp.toString();
	}
};

var convertToGasPrice = function(data, hex) {
	var tmp = new BigNumber(data);
	tmp = tmp * 1e+9;
	if (hex) {
		return "0x" + tmp.toString(16);
	} else {
		return tmp.toString();
	}
};

var convertToAmount = function(data, hex) {
	var tmp = new BigNumber(data);
	tmp = tmp * 1e+18;
	if (hex) {
		return "0x" + tmp.toString(16);
	} else {
		return tmp.toString();
	}
};

var calcFee = function(gasPrice, gasLimit) {
	var np = new BigNumber(gasPrice);
	np = np * 1e+9;
	var nl = new BigNumber(gasLimit);
	nl = nl * 1;
	var nt = np * nl;
	nt = nt / 1e18;
	return nt.toString();
};

var getNow = function() {
	var now = Date.parse(new Date()) / 1000;
	return now;
};

var formatPriv = function(priv) {
	return priv.replace(/(.{4})/g,'$1 ');
}

var lessAddr = function(addr, l) {
	//return addr.substr(2, l) + "..."
	return Base58.fromAddr(addr).substr(0, l) + "...";
}

var lessAddrForTx = function(addr, l) {
	return Base58.fromAddr(addr).substr(0, l) + "..."
}

var readCore = function(fileReader, cb) {
	var reader = new FileReader();
	reader.onloadend = function(e) {
		cb(e.target.result)
	}
	reader.readAsText(fileReader);
}

var hashInTxs = function(hash, txs) {
	var res = false;
	for(var i = 0; i < txs.length; i++) {
		if(txs[i].hash == hash) {
			return true;
		}
	}
	return false;
}

var showAmount = function(data) {
	var ban = new BigNumber(data)
	ban = ban / (1e+18)
	return ban.toString();
}

///////////////////////////////////////
var get_query_owner = function() {
	var res = "0x8da5cb5b";
	return res;
}

var get_query_user = function(addr) {
	var res = "0x5617a6e8" + "000000000000000000000000" + addr.substr(2);
	return res;
}

var gen_registration = function(addr, amount) {
	var res = "0xf0aaebe8" + "000000000000000000000000" + addr.substr(2) + idtohex(amount);
	return res;
}

var gen_withdraw = function() {
	var res = "0x3ccfd60b";
	return res;
}

var idtohex = function(id) {
	var x = new BigNumber(id);
	x = x * (1e18)
	var y = x.toString(16);
	var na = "";
	var more = 64 - y.length;
	for(var i = 1; i <= more; i++ ) {
		na = "0" + na;
	}
	return na + y;
}

var registration = function(from, addr, amount, spriv, cb_succ, cb_fail) {
	var tx = Yoethwallet.tx;
	var wallet = Yoethwallet.wallet;
	wallet.fromPrivateKey(spriv, function (err, keystore) {
		if (err) {
			alert(err.message);
			return
		}
		var priv = keystore.getPrivateKey();
		dnp_gasPrice(function(data_gasPrice) {
			dnp_getTransactionCount(from, "latest", function(data_count) {
				dnp_gasLimit(from, get_gsp_contract(), mountToHex(2 * amount), gen_registration(addr, amount), function(data_gas) {
					var tx = Yoethwallet.tx;
					var contractTx = tx.contractTx(gen_registration(addr, amount), {
						from: from,
						to: get_contract(),
						value: mountToHex(2 * amount),
						nonce: data_count,
						gas: data_gas,
						//gas: "0x1"
						gasPrice: data_gasPrice,
						chainId: null,
					})
					contractTx.sign(priv);
					var signedTransaction = '0x' + contractTx.serialize().toString('hex');
					dnp_sendRawTransaction(signedTransaction, function(data_tx) {
						cb_succ(data_tx);
					}, function(err_tx) {
						cb_fail(err_tx)
					})
				}, function(err_gas) {
					cb_fail(err_gas);
				});
				
			}, function(err_count) {
				cb_fail(err_count);
			})
		}, function(err_gasPrice) {
			cb_fail(err_gasPrice);
		})
	})
}

var withdraw = function(from, spriv, cb_succ, cb_fail) {
	var tx = Yoethwallet.tx;
	var wallet = Yoethwallet.wallet;
	wallet.fromPrivateKey(spriv, function (err, keystore) {
		if (err) {
			alert(err.message);
			return
		}
		var priv = keystore.getPrivateKey();
		dnp_gasPrice(function(data_gasPrice) {
			dnp_getTransactionCount(from, "latest", function(data_count) {
				dnp_gasLimit(from, get_gsp_contract(), mountToHex(0), gen_withdraw(), function(data_gas) {
					var tx = Yoethwallet.tx;
					var contractTx = tx.contractTx(gen_withdraw(refer), {
						from: from,
						to: get_contract(),
						value: mountToHex(0),
						nonce: data_count,
						gas: data_gas,
						//gas: "0x1"
						gasPrice: data_gasPrice,
						chainId: null,
					})
					contractTx.sign(priv);
					var signedTransaction = '0x' + contractTx.serialize().toString('hex');
					dnp_sendRawTransaction(signedTransaction, function(data_tx) {
						cb_succ(data_tx);
					}, function(err_tx) {
						cb_fail(err_tx)
					})
				}, function(err_gas) {
					cb_fail(err_gas);
				});
				
			}, function(err_count) {
				cb_fail(err_count);
			})
		}, function(err_gasPrice) {
			cb_fail(err_gasPrice);
		})
	})
}

var mountToHex = function(amount) {
	var num = new BigNumber(amount);
	num = num * 1e18;
	return "0x" + num.toString(16);
}

var parseUsers = function(user) {
	var x = user.substr(2, 64);
	var y = user.substr(66, 64);
	var z = user.substr(130, 64);

	var nx = new BigNumber("0x" + x);
	var ny = new BigNumber("0x" + y);
	var nz = new BigNumber("0x" + z);
	nz = nz / (1e18);

	return {
		current: parseInt(nx.toString()),
		total: parseInt(ny.toString()),
		amount: nz.toString()
	}
}

///
var changeLang = function() {
	var mylang = getLanguage();

	$(".lang").each(function(index, element) {
		$(this).text(mylang[$(this).attr("key")]);
	});
}

var setLanguage = function() {
	var lang = localStorage.getItem('language');
	if(lang == null) {
		localStorage.setItem('language', 'ch');
	}
	if(lang == 'en') {
		localStorage.setItem('language', 'ch');
	} else {
		localStorage.setItem('language', 'en');
	}
	changeLang();
}

var getLanguage = function() {
	var lang = localStorage.getItem('language');
	if(lang == null) {
		return lang_en;
	}
	if(lang == 'en') {
		return lang_en;
	} else {
		return lang_ch;
	}
}