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

        // Filter sponsors to exclude those with an expiry date in the past
        const nonExpiredSponsors = sponsors.filter(sponsor => {
            if (!sponsor.expiry_date) {
                return true; // Include sponsors with no expiry date
            }
            const expiryDate = new Date(sponsor.expiry_date);
            const today = new Date();
            return expiryDate >= today; // Include sponsors that aren't expired yet
        });

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
                                const categorySponsors = nonExpiredSponsors.filter(sponsor => sponsor.category === category);
                                if (categorySponsors.length === 0) return null;
                                return (
                                    <div key={category} className="rounded-grey-background mt-4 text-center">
                                        <h3 className="text-underline">{category}</h3>
                                        <div className="row justify-content-center">
                                            {categorySponsors.map(sponsor => (
                                                <div className="col-12 col-md-6 col-lg-4">
                                                    <div key={sponsor.id} className="sponsor-container text-center m-2 d-flex flex-column align-items-center">
                                                        <a href={sponsor.url} className="text-decoration-none text-white w-100 h-100 d-flex flex-column" target="blank">
                                                            <div className="image-wrapper d-flex justify-content-center align-items-center flex-grow-1">
                                                                <img className="sponsor-image img-fluid" src={sponsor.image_url} alt={sponsor.title} />
                                                            </div>
                                                            <h5 className="sponsor-title mt-auto">{sponsor.title}</h5>
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