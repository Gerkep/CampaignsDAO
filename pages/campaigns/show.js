import React, {Component} from "react";
import { Button, Card, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from '../../routes';


class CampaignShow extends Component{

    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return { 
            address: props.query.address,
            minimumContribution: summary[0],
            balance: web3.utils.fromWei(summary[2], 'wei'),
            requestsCount: summary[1],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards(){
        const {
            balance, 
            manager, 
            minimumContribution, 
            requestsCount, 
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'The manager created this campaign and can create request to withdraw money.',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution( wei)',
                description: 'You must contribute at least this much wei to become an approver.',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Request must be approved by approvers.',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: approversCount,
                meta: 'Number of Contributors',
                description: 'Number of people who donated to this capmaign.',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (eth)',
                description: 'The balance is how much money this campaign has left to spend.',
                style: {overflowWrap: 'break-word'}
            },
        ];

        return <Card.Group items={items}></Card.Group>;
    }

    render(){
        return (
            <Layout>
                <h3>Campaign</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={11}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary >View requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Layout>
        )
    }
}

export default CampaignShow;