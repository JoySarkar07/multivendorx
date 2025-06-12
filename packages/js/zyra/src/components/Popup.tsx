/**
 * External dependencies
 */
import React from 'react';
import { DialogContent, DialogContentText } from '@mui/material';

/**
 * Internal dependencies
 */
import '../styles/web/Popup.scss';

// Types
export interface PopupProps {
	proUrl?: string;
	title?: string;
	messages?: string[];
	moduleName?: string;
	settings?: string;
	plugin?: string;
	moduleMessage?: string;
	moduleButton?: string;
	pluginDescription?: string;
	pluginMessage?: string;
	pluginButton?: string;
	SettingDescription?: string;
	SettingMessage?: string;
	pluginUrl?: string;
	modulePageUrl?: string;
}

const ProPopup: React.FC<PopupProps> = (props) => {
	const safeProUrl = props.proUrl || '#';

	return (
		<DialogContent>
			<DialogContentText>
				<div className="popup-wrapper">
					<div className="popup-content">
						{props.messages && (
							<div className="heading">
								Unlock{' '}
								<span className="pro-text">Pro</span>
							</div>
						)}
						<div className="popup-body">
							{props.messages && (
								<>
									<strong>{props.title}</strong>
									<p>&nbsp;</p>
									{props.messages?.map(
										(message, index) => (
											<p key={index}>{`${index + 1
												}. ${message}`}</p>
										)
									)}
								</>
							)}
							{props.moduleName && (
								<>
									<h2>{props.moduleMessage}</h2>
									<a
										className="admin-btn btn-red"
										href={props.modulePageUrl}
									>
										{props.moduleButton}
									</a>
								</>
							)}
							{props.messages && (
								<a
									className="admin-btn btn-red"
									target="_blank"
									rel="noopener noreferrer"
									href={safeProUrl}
								>
									Upgrade to Pro
								</a>
							)}

							{props.settings && (
								<>
									<h2>{props.SettingMessage}</h2>
									<p id="description">
										{props.SettingDescription}
									</p>
								</>
							)}
						</div>

						{props.plugin && (
							<>
								<h2>{props.pluginMessage}</h2>
								<p>
									{props.pluginDescription}
								</p>
								<a
									className="admin-btn btn-red"
									target="_blank"
									rel="noreferrer"
									href={props.pluginUrl}
								>
									{props.pluginButton}
								</a>
							</>
						)}
					</div>
				</div>
			</DialogContentText>
		</DialogContent>
	);
};

export default ProPopup;
