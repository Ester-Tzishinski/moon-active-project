import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

class Scroll2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 20,
            hasMoreItems: true
        };
    }
    componentDidMount() {
        fetch('api/promotions')
          .then(response => response.json())
          .then(data => this.setState({ promotions: data, isLoading: false }));
      }
    showItems() {
        var items = [];
        for (var i = 0; i < this.state.items; i++) {
            items.push(<li key={i}> Item {i} </li>);
            console.log(i);
        }
        return items;
    }
    loadMore() {
        if (document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            this.setState({ hasMoreItems: false });
        } else {
            setTimeout(() => {
                this.setState({ items: this.state.items + 20 });
            }, 2000);
        }
    }
    render() {
        const { promotions } = this.state;
        console.log("promotionsScroll", promotions);
        
        return (
            <div className="App">
                <div style={{ height: '600px', overflow: 'auto' }}>
                    <InfiniteScroll
                        loadMore={this.loadMore.bind(this)}
                        hasMore={this.state.hasMoreItems}
                        loader={<div className="loader"> Loading... </div>}
                        useWindow={false}>
                        {this.showItems()}{" "}
                    </InfiniteScroll>{" "}
                </div>{" "}
            </div>
        );
    }
}

export default Scroll2;