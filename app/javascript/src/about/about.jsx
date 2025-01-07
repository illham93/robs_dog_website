import React from "react";

class About extends React.Component {

    state = {
        loading: true,
        error: '',
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="about-section p-4 rounded shadow-sm">
                    <h1 className="mb-4">About Lake Ontario HRC</h1>
                    <span className="fs-5">
                        <p>Lake Ontario HRC is a member of the Hunting Retriever Club (HRC), and The United Kennel Club (UKC). Located in Kawartha Lakes, Ontario, LOHRC offers regular club training days for its members, hosts a Regular Hunt Test in June & an Upland Hunt Test in the fall each year.</p>
                        <p>LOHRC holds training days that are designed to develop the “Hunting Retriever”. We do this by setting up realistic hunt tests, drill days, & preparing dogs for the hunting season. Our members are always happy to help new retriever owners and members!</p>
                        <p>Club membership is open to persons of all ages who are in good standing with UKC & HRC. You are also required to have an OFAH (Ontario Federation of Anglers and Hunters) membership. *Please note, if you don’t have an OFAH membership, you can purchase yours with your club membership.</p>
                        <p>If you have any questions on obtaining memberships for UKC and HRC, please send an email to <a href="mailto:lakeontariohrc@outlook.com">lakeontariohrc@outlook.com</a>.</p>
                    </span>
                </div>
            </div>
        )
    }
}

export default About;