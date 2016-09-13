var plivoApp = function () {
	this.country = pricingData[0].country;
	this.usage = null;
	this.pricing = pricingData[0];
	this.loadCountries = function() {
		var html = '';
		for (var i = 0; i < pricingData.length; i++) {
			html += '<option value="' + pricingData[i].country + '">' + pricingData[i].country_name + '</option>';
		}
		document.getElementById('country-data').innerHTML = html;
	};

	this.setUsage = function(element) {
		var self = this;
		self.usage = document.getElementById(element.id).value;	
		var twilio;
		var plivo;
		var saving;
		if (self.usage >= 500) {
			twilio = parseInt(self.pricing.twilio * self.usage);
			plivo = parseInt(self.pricing.plivo * self.usage);
			saving = ((twilio - plivo) * 12);
		}else{
			twilio = parseFloat(self.pricing.twilio * self.usage).toFixed(2);
			plivo = parseFloat(self.pricing.plivo * self.usage).toFixed(2);	
			saving = ((twilio - plivo) * 12).toFixed(2);
		}
		var html = '<div class="col">$' + plivo + '</div><div class="col">$' + twilio + '</div><div class="col">$'+ saving +'</div>';
		document.getElementById('pricing-data').innerHTML = html;
	}

	this.setCountry = function(element) {
		var self = this;
		self.country = document.getElementById(element.id).value;
		for (var i = 0; i < pricingData.length; i++) {
			if (pricingData[i].country === self.country){
				self.pricing = pricingData[i];
			}
		}
	}
}

window.onload = function (argument) {
	var app = new plivoApp();
	app.loadCountries();
	document.getElementById('country-data').addEventListener('change',function(e) {
		document.getElementById('usage-data').value = '';
		app.setCountry(this);
		showLoader();	
	});
	document.getElementById('usage-data').addEventListener('blur',function(e) {
		this.value = this.value.replace(/[a-zA-z]/g, "");
		if (this.value > 0){
			app.setUsage(this);
			hideLoader();
		}else{
			showLoader();
		}
	});
	document.getElementById('usage-data').addEventListener('keyup',function(e) {
		this.value = this.value.replace(/[a-zA-z]/g, "");
		if ((e.keyCode <= 57 && e.keyCode >= 48) || e.keyCode == 8 ) {
			if (this.value > 0){
				app.setUsage(this);
				hideLoader();
			}else{
				showLoader();
			}
		}
	});
}

function hideLoader() {
	document.getElementById('loading-message').className = 'loading-message hidden';
}

function showLoader() {
	document.getElementById('loading-message').className = 'loading-message shown';
}