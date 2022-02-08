import React, {useEffect, useState} from "react";
import {Box, Container, Grid, makeStyles, Popover} from '@material-ui/core';
import Image from "next/image";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import pageConfigClient from "../../lib/contentfulService";
import NewsData from "../../components/NewsData";

interface ILogo {
    fields: {
        file: {
            url: string
            description: string
            file: any
            title: string
        }
    }
}

export interface IPageDisplayConfig {
    logo: ILogo
    menuLabel: string
    searchLabel: string
    ttile: string
}

const useStyles = makeStyles({
    newsCardWrapper: {
        display: 'flex',
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 24px',
        borderBottom: '1px solid #ccc',
        '& h5': {
            margin: 0,
            fontSize: '16px',
            color: '#333',
        },
        '& h4': {
            margin: 0,
            fontSize: '18px',
            color: '#266ba1',
            fontWeight: '600',

        },
    },
    angleDown: {
        '& svg': {
            fill: '#fba901',
        },
    },
    customDropDown: {
        cursor: 'pointer',
        display: 'flex',
        '& h4': {
            marginLeft: '8px',
        },
    },
    menuList: {
        padding: '12px 16px',
        cursor: 'pointer',
        '&:hover': {
            background: '#ddd',
        },
    },
    logo: {
        padding: '24px 0',
        borderBottom: '1px solid #ccc',
        '&img': {
            maxWidth: '100%',
            height: 'auto',
        },
    },
})

function News() {

    const [pageDisplayConfig, setPageDisplayConfig] = useState<IPageDisplayConfig | null>(null);
    const [anchorEl, setAnchorEl] = useState<EventTarget & Element | null>(null);

    const classes = useStyles();

    useEffect(() => {
        pageConfigClient.getEntries()
            .then(res => {
                const {fields} = res.items[0];
                setPageDisplayConfig(fields as IPageDisplayConfig);
            }).catch(err => {
            console.log(err);
        });
    }, []);

    const handleUserClick = (event: React.MouseEvent<Element, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            {pageDisplayConfig && (
                <Container>
                    <Grid>
                        <Grid item xs={12}>
                            <Box className={classes.logo}>
                                <Image
                                    src={`https:${pageDisplayConfig.logo.fields.file.url}`}
                                    width={'100'}
                                    height={'30'}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={classes.headerWrapper}>
                                <h5>{pageDisplayConfig.menuLabel}</h5>

                                <div className={classes.customDropDown} aria-controls="simple-menu" aria-haspopup="true"
                                     onClick={(event) =>
                                         handleUserClick(event)}>
                                    <AccountCircleIcon/>
                                    <h4>John Doe</h4>
                                    <div className={classes.angleDown}>
                                        <ArrowDropDownIcon/>
                                    </div>
                                </div>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                >
                                    <div className={classes.menuList}>Logout</div>
                                </Popover>

                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <NewsData
                                searchLabel={pageDisplayConfig.searchLabel}
                            />
                        </Grid>
                    </Grid>
                </Container>
            )}
        </div>
    );
}

export default News;
