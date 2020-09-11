import React from 'react';
import ProgressBar from './progressBar';

export default function InfoBar({ score, quizeNumber,length }) {
    return (
        <div id="info">
            <div className="info-item">
                <p className="info-prefix">Quiz {quizeNumber}/{length}</p>
                <ProgressBar max={length} current={quizeNumber} />
            </div>
            <div className="info-item">
                <p className="info-prefix">Score</p>
                <h3 className="info-main-text">{score}</h3>
            </div>
        </div>
    );
}
