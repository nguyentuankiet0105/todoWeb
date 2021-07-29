import * as React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Body from '../layout/Body';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import TimerStore from '../Store/index';

import '../Style/Home.css';

const Home = () => {
  return (
    <div className="container">
      <Header />
      <Body />
      <Footer />
      {/* <button onClick={() => TimerStore.reset()}>
        Seconds passed: {TimerStore.secondsPassed}
      </button>
      <button onClick={() => TimerStore.increase()}>Tang</button>
      <button onClick={() => TimerStore.decrease()}>Giam</button> */}
    </div>
  );
};
export default observer(Home);
