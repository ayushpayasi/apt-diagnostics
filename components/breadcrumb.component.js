import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import React from 'react'

export default function BreadCrumb(props) {
    const links ={
        home:"/",
        about:"/about",
        tests:"/tests",
        diagnostics:"/diagnostics",
        partner:"/partner",
        corporates:"/corporates",
        labs:"labs",
        support:"/support",
        account:"/account"
    }
    const decoratecrumbs = (li)=>{
        return(
            <Breadcrumb>
        {li.map(item=><BreadcrumbItem><a href={links[item]} className="breadcrumb-link">{item}</a></BreadcrumbItem>) }
            </Breadcrumb>
        )
    }

    return (
        <>
            {decoratecrumbs(props.links)}
        </>
    )
}
