import React, { Fragment } from 'react';
import Head from 'next/head';
import classNames from 'classnames/bind';
import { Header } from '../Header/Header';
import STYLES from './PageShell.module.css';
const classes = classNames.bind(STYLES);

export interface PageShellProps {
  title: string;
  description: string;
  preview?: boolean;
  mainClassName?: string;
}

export const PageShell: React.FunctionComponent<PageShellProps> = ({
  title,
  children,
  mainClassName,
  description,
  preview,
}) => {
  return (
    <Fragment>
      <Head>
        <title>{title} - Richard Willis</title>
        <meta name="description" content={description} />
      </Head>
      <div className={classes('root')}>
        <Header />
        <main className={classes('main', mainClassName)}>{children}</main>
      </div>
    </Fragment>
  );
};
