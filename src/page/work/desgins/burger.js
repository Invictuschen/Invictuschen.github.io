import React from 'react';
import BurgerBuilder from '../burger/containers/BurgerBuilder/BurgerBuilder';
import Layout from '../burger/components/Layout/Layout';
const burger = () => {
    return (
            <article className="work-pop-main">  
            <Layout>
                <BurgerBuilder/>
            </Layout>
        </article>
    );
};

export default burger;