import * as React from 'react';
// import './index.css';
import { widget } from '../../public/charting_library/charting_library';
import Datafeed from './api';
// import eventBus from "../eventBus";

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent {
	// 
	// 0xdc9232e2df177d7a12fdff6ecbab114e2231198d
	static defaultProps = {
		symbol: '0xdc9232e2df177d7a12fdff6ecbab114e2231198d',
		containerId: 'tv_chart_container',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
		allow_symbol_change: false,
	};
	
	tvWidget = null;

	componentDidMount() {
		console.log("lala", this.props.match)
		const widgetOptions = {
			symbol: this.props.match?this.props.match:this.props.symbol,
			datafeed: Datafeed,
			interval: '30',
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			theme: 'dark',
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			disabled_features: ["header_symbol_search"],
		};

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

	}
	componentWillUnmount() {
		console.log("componentWillUnmount")
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}
	componentDidUpdate(prevProps) {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
		console.log("lalala", this.props.match)
		const widgetOptions = {
			symbol: this.props.match?this.props.match:this.props.symbol,
			datafeed: Datafeed,
			interval: '30',
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			theme: 'dark',
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			disabled_features: ["header_symbol_search"],
		};

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;
	}

	render() {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}
