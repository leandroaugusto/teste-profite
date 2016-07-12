
var CarouselProducts = React.createClass({
	loadJson: function(){
		var jsonData = new XMLHttpRequest(),
			that = this;

		jsonData.overrideMimeType("application/json");

		this.serverRequest = jsonData.onreadystatechange = function() {
			if (jsonData.readyState == 4 && jsonData.status == 200) {
				that.setState({ data: JSON.parse(jsonData.responseText) });
			}
		}.bind(this);

		jsonData.open("GET", that.props.url, true);
		jsonData.send();
	},
	getInitialState: function(){
		return { data: undefined };
	},
	componentDidMount: function(){
		this.loadJson();
	},
	componentWillUnmount: function() {
		this.serverRequest.abort();
	},
	render: function(){
		var rendered;

		if ( this.state.data != undefined ) {
			rendered = (
			<div className="products-container">
				<ul className="total-carousel">
					{this.state.data.products.map(function (product) {
						return <Product key={product.name} data={product} />;
					})}
				</ul>
			</div>)
		} else {
			rendered = (<p>Loading</p>)
		}

		return (
			rendered
		);
	}
});

var Product = React.createClass({
	render: function(){
		var obj = this.props.data;
		return (
			<li className="item">
				<img src={'images/sapatos/'+obj.img} alt={obj.name} />
				<p>{obj.name}</p>
				{ obj.for != '' ? <span className="price-for">{'De: R$ '+obj.for}</span> : ''}
				<span className="price">
					{'Por: R$ '}<span>{obj.price}</span>
				</span>
				<span className="times">
					{'ou '}<b>{'até '+obj.times+'X '}</b>{'de'}<b>{'R$ '+obj.value_times}</b>
				</span>
				<a className="button-buy">comprar</a>
				<span>{'Economize: R$ '+obj.save_value}</span>
			</li>
		);
	}
})

var myElement = <CarouselProducts url="data/data.json" />

ReactDOM.render(
	myElement,
	document.getElementById('application')
);

// Carousel
var carousel = {
	init: function(el, rail, item, arrows){
		var direction = null,
			steps = 0;

		function prev(){
			document.querySelector(arrows+'.prev').onclick = function(){
				direction = 'left';
				move();
			}
		}
		function next(){
			document.querySelector(arrows+'.next').onclick = function(){
				direction = 'right';
				move();
			}
		}
		function move(){
			if ( direction == 'left' ) {
				steps += 20
				document.querySelector(rail).style.left = '-'+steps+'px';
			} else if ( direction == 'right' ) {
				document.querySelector(rail).style.left = steps+'px';
			}
		}
		prev();
		next();
	}
}

carousel.init(
	'.carousel-banners',
	'.content-banners',
	'.item-banner',
	'.arrows-banner');

