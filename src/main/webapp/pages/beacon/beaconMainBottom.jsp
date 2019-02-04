<script>
	var counter = 0;
	TypingText = function(element, interval, cursor, finishedCallback) {
		if ((typeof document.getElementById == "undefined") || (typeof element.innerHTML == "undefined")) {
			this.running = true; // Never run.
			return;
		}
		this.element = element;
		this.finishedCallback = (finishedCallback ? finishedCallback : function() {
			return;
		});
		this.interval = (typeof interval == "undefined" ? 100 : interval);
		this.origText = this.element.innerHTML;
		this.unparsedOrigText = this.origText;
		this.cursor = (cursor ? cursor : "");
		this.currentText = "";
		this.currentChar = 0;
		this.element.typingText = this;
		if (this.element.id == "")
			this.element.id = "typingtext" + TypingText.currentIndex++;
		TypingText.all.push(this);
		this.running = false;
		this.inTag = false;
		this.tagBuffer = "";
		this.inHTMLEntity = false;
		this.HTMLEntityBuffer = "";
	}
	TypingText.all = new Array();
	TypingText.currentIndex = 0;
	TypingText.runAll = function() {
		console.log(TypingText.all)
		for (var i = 0; i < TypingText.all.length; i++)
			TypingText.all[i].run();
	}

	TypingText.runOne = function() {

		TypingText.all[counter].run();
		counter++;
	}

	TypingText.prototype.run = function() {
		if (this.running)
			return;
		if (typeof this.origText == "undefined") {
			setTimeout("document.getElementById('" + this.element.id + "').typingText.run()", this.interval); // We haven't finished loading yet.  Have patience.
			return;
		}
		if (this.currentText == "")
			this.element.innerHTML = "";
		//  this.origText = this.origText.replace(/<([^<])*>/, "");     // Strip HTML from text.
		if (this.currentChar < this.origText.length) {
			if (this.origText.charAt(this.currentChar) == "<" && !this.inTag) {
				this.tagBuffer = "<";
				this.inTag = true;
				this.currentChar++;
				this.run();
				return;
			} else if (this.origText.charAt(this.currentChar) == ">" && this.inTag) {
				this.tagBuffer += ">";
				this.inTag = false;
				this.currentText += this.tagBuffer;
				this.currentChar++;
				this.run();
				return;
			} else if (this.inTag) {
				this.tagBuffer += this.origText.charAt(this.currentChar);
				this.currentChar++;
				this.run();
				return;
			} else if (this.origText.charAt(this.currentChar) == "&" && !this.inHTMLEntity) {
				this.HTMLEntityBuffer = "&";
				this.inHTMLEntity = true;
				this.currentChar++;
				this.run();
				return;
			} else if (this.origText.charAt(this.currentChar) == ";" && this.inHTMLEntity) {
				this.HTMLEntityBuffer += ";";
				this.inHTMLEntity = false;
				this.currentText += this.HTMLEntityBuffer;
				this.currentChar++;
				this.run();
				return;
			} else if (this.inHTMLEntity) {
				this.HTMLEntityBuffer += this.origText.charAt(this.currentChar);
				this.currentChar++;
				this.run();
				return;
			} else {
				this.currentText += this.origText.charAt(this.currentChar);
			}
			this.element.innerHTML = this.currentText;
			this.element.innerHTML += (this.currentChar < this.origText.length - 1 ? (typeof this.cursor == "function" ? this.cursor(this.currentText) : this.cursor) : "");
			this.currentChar++;
			setTimeout("document.getElementById('" + this.element.id + "').typingText.run()", this.interval);
		} else {
			this.currentText = "";
			this.currentChar = 0;
			this.running = false;
			this.finishedCallback();
			$("#beaconmsgs" + counter).removeClass('blink');
			$("#beaconimg").attr("src", "/img/hand" + counter + ".png");
			console.log('done-> ' + counter)
		}
	}
</script>
<style>
.blink {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {  
  50% { opacity: 0; }
}
</style>
<h6 class="w3-opacity">Active Store Beacons & Services</h6>
<div style='width: 100%; border: 1px solid #ccc; padding: 10px; height: 250px'>
	<div style='background-color: #fff; color: #666; height: 220px; padding: 5px'>

		<table class=bordertable style='width:100%'><tr><td colspan=3></td></tr>
			<tr>
				<td class=bordercell width=30><img src='/img/tooltip_pulse.gif' height=25 width=25></td><td class=bordercell style='width:100px'><span class='blink' id='beaconmsgs1'></span></td><td class=bordercell style='width:550px'><span id='beaconmsgs1a'></span></td>
			<tr>
			<tr>
				<td class=bordercell width=30><img src='/img/tooltip_pulse.gif' height=25 width=25></td><td class=bordercell><span class='blink' id='beaconmsgs2'></span></td><td class=bordercell><span id='beaconmsgs2a'></span></td>
			</tr>
			<tr>
				<td class=bordercell width=30><img src='/img/tooltip_pulse.gif' height=25 width=25></td><td class=bordercell><span class='blink' id='beaconmsgs3'></span></td><td class=bordercell><span id='beaconmsgs3a'></span></td>
			</tr>
				<tr>
				<td class=bordercell width=30><img src='/img/tooltip_pulse.gif' height=25 width=25></td><td class=bordercell><span class='blink' id='beaconmsgs4'></span></td><td class=bordercell><span id='beaconmsgs4a'></span></td>
			</tr>
						</tr>
				<tr>
				<td class=bordercell width=30><img src='/img/tooltip_pulse.gif' height=25 width=25></td><td class=bordercell><span class='blink' id='beaconmsgs5'></span></td><td class=bordercell><span id='beaconmsgs5a'></span></td>
			</tr>
		</table>
	</div>
</div>
<br>

<script>
	setTimeout(alertFunc0a, 0);
	setTimeout(alertFunc0, 3000);

	setTimeout(alertFunc1a, 0);
	setTimeout(alertFunc1, 12000);

	setTimeout(alertFunc2a, 0);
	setTimeout(alertFunc2, 24000);

	setTimeout(alertFunc3a, 0); 
	setTimeout(alertFunc3, 34000);
	
	setTimeout(alertFunc4a, 0); 
	setTimeout(alertFunc4, 54000);


	function alertFunc0a() {
		$("#beaconmsgs1").html('<b>Store Entrance Beacon</b> :&nbsp;')
	}

	function alertFunc1a() {
		$("#beaconmsgs2").html('<b>User Profile Service</b> :&nbsp;')
	}

	function alertFunc2a() {
		$("#beaconmsgs3").html('<b>Summer Display Beacon</b> :&nbsp;')
	}

	function alertFunc3a() {
		$("#beaconmsgs4").html('<b>Spring Display Beacon</b> :&nbsp;')
	}
	
	function alertFunc4a() {
		$("#beaconmsgs5").html('<b>Cosmetic Aisle Beacon</b> :&nbsp;')
	}


	function alertFunc0() {

		var iDiv = document.createElement('span');
		iDiv.id = 'example2';
		iDiv.innerHTML = "Device Detected : MAC Address 01:23:45:67:89:AC in range at " + new Date();
		document.getElementById('beaconmsgs1a').appendChild(iDiv);

		new TypingText(document.getElementById("example2"), 50, function(i) {
			var ar = new Array("\\", "|", "/", "-");
			return " " + ar[i.length % ar.length];
		});
		TypingText.runOne();
	}

	function alertFunc1() {

		var iDiv = document.createElement('span');
		iDiv.id = 'example3';
		iDiv.innerHTML = "Device Identified John Doe (loyalty, rewards, platinum member) Sending Welcome Message</p>";
		document.getElementById('beaconmsgs2a').appendChild(iDiv);

		new TypingText(document.getElementById("example3"), 50, function(i) {
			var ar = new Array("\\", "|", "/", "-");
			return " " + ar[i.length % ar.length];
		});
		TypingText.runOne();
	}

	function alertFunc2() {

		var iDiv = document.createElement('span');
		iDiv.id = 'example4';
		iDiv.innerHTML = "Device Detected : MAC Address 01:23:45:67:89:AC : Sending Promotion 000000001</p>";
		document.getElementById('beaconmsgs3a').appendChild(iDiv);

		new TypingText(document.getElementById("example4"), 50, function(i) {
			var ar = new Array("\\", "|", "/", "-");
			return " " + ar[i.length % ar.length];
		});
		TypingText.runOne();
	}

	function alertFunc3() {

		var iDiv = document.createElement('span');
		iDiv.id = 'example5';
		iDiv.innerHTML = "Device Detected : MAC Address 01:23:45:67:89:AC : Sending Coupon 000000002</p>"
		document.getElementById('beaconmsgs4a').appendChild(iDiv);

		new TypingText(document.getElementById("example5"), 50, function(i) {
			var ar = new Array("\\", "|", "/", "-");
			return " " + ar[i.length % ar.length];
		});
		TypingText.runOne();
	}
	
	function alertFunc4() {

		var iDiv = document.createElement('span');
		iDiv.id = 'example6';
		iDiv.innerHTML = "Device Detected : MAC Address 01:23:45:67:89:AC : Sending Price Match 000000003</p>"
		document.getElementById('beaconmsgs5a').appendChild(iDiv);

		new TypingText(document.getElementById("example6"), 50, function(i) {
			var ar = new Array("\\", "|", "/", "-");
			return " " + ar[i.length % ar.length];
		});
		TypingText.runOne();
	}
</script>