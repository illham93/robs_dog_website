import React from "react";
import { handleErrors } from "../utils/fetchHelper";

class Sponsors extends React.Component {
    state = {
        loading: true,
        error: '',
        sponsors: [],
    }

    componentDidMount () {
        fetch('/api/sponsors')
            .then(handleErrors)
            .then(data => {
                console.log(data);
                this.setState({
                    sponsors: data.sponsors,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Could not load sponsors',
                    loading: false
                });
            });
    }

    render() {
        const {loading, error, sponsors} = this.state;

        // Sort the sponsors by category
        const categoryOrder = ["Hall of Fame", "Grand Hunting Retriever Champion", "Hunting Retriever Champion", "Hunting Retriever", "Started Hunting Retriever"];

        return (
            <div>
                <h3 className="text-center mb-4">Thank you to our generous sponsors!</h3>
                
                {loading && <h3>Loading...</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <>
                        <div>
                            {categoryOrder.map(category => {
                                const categorySponsors = sponsors.filter(sponsor => sponsor.category === category);
                                if (categorySponsors.length === 0) return null;
                                return (
                                    <div key={category} className="rounded-grey-background mt-4 text-center">
                                        <h3 className="text-underline">{category}</h3>
                                        <div className="row">
                                            {categorySponsors.map(sponsor => (
                                                <div className="col-12 col-sm-6 col-md-4">
                                                    <div key={sponsor.id} className="d-inline-block text-center m-2">
                                                        <a href={sponsor.url} className="text-decoration-none text-white">
                                                            <img className="sponsor-image img-fluid mb-2" src={sponsor.image_url} alt={sponsor.title} />
                                                            <h5>{sponsor.title}</h5>
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        )
    }
}

export default Sponsors;