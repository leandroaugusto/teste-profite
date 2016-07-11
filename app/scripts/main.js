// main.js
// var obj;

// function loadDoc() {
// 	var jsonData = new XMLHttpRequest();
// 	jsonData.onreadystatechange = function() {
// 		if (jsonData.readyState == 4 && jsonData.status == 200) {
// 			obj = JSON.parse(jsonData.responseText);
// 		}
// 	};
// 	jsonData.open("GET", "data/data.json", true);
// 	jsonData.send();
// }

var flag = false;

var CarouselProducts = React.createClass({
	loadJson: function(){
		var jsonData = new XMLHttpRequest(),
			that = this;

		jsonData.overrideMimeType("application/json");
		
		this.serverRequest = jsonData.onreadystatechange = function() {
			if (jsonData.readyState == 4 && jsonData.status == 200) {
				that.setState({ data: JSON.parse(jsonData.responseText) }, function(){
					flag = true;
				});
			}
		};

		jsonData.open("GET", "data/data.json", true);
		jsonData.send();
	},
	getInitialState: function(){
		return { data: [] };
	},
	componentDidMount: function(){
		if (flag) {
			this.loadJson();
		}
	},
	render: function(){
		console.log(this.state.data);
		return (
			<div className="products-container">
				<div className="total-carousel">
					{this.state.data.products.map(function (product) {
						return <Product key={product.name} data={product} />;
					})}
				</div>
			</div>
		);
	}
});

var Product = React.createClass({
	render: function(){
		return (
			<li className="item">
				<p>{this.props.data.name}</p>
				<img src={'images/sapatos/'+this.props.data.img} alt={this.props.data.name} />
			</li>
		);
	}
})

var myElement = <CarouselProducts /> //data={products}

ReactDOM.render(
	myElement,
	document.getElementById('application')
);