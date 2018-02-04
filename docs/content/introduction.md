## ReViz 3D

What if within just few minutes after building a cool Hardware prototype, maybe even a DIY Arduino project, you could visualize the data in 3D interactive environment? Furthermore, what if you could save and share this visualization in multiple platforms? Maybe even your portfolio webpage. Or even visualizing a GIS dataset in a more cool way?

Welcome to ReViz3D, a tool to quick prototype visualizations of hardware devices, sensors, local and remote data. With focus on spatial contextualized information and able to export projects as [React](https://reactjs.org) Components, those can be incorporated into [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/), Cross Platform Apps (using [electron](https://electronjs.org)) or simply static web pages.

This software is meant to be used to reduce the gap between deploying sensors and visualizing, sharing and having insights about the collected data. 

It works by rendering realtime changes in JavaScript code, .JSON local data files, SerialPort Streams, MQTT messages and some asseets e.g. .obj 3D models. ReViz keeps watching all the files linked to a project, re-loading assets only when changes are made.

Reviz also provides intuitive and simple SerialPort and MQTT connections interfaces, requiring almost zero configuration to the user to be able to read data from those streams.

The 3D environment is provided by [three.js](http://threejs.org). So the developers can use almost any three.js example and use ReViz to export is as a ReactComponent. More details about how to use three.js methods and classes in the next topics.

ReViz3D was built by a team at MIT Media Lab, It's Free to use, open-source and if you want to contribute to develop fork it @: [Github](https://github.com/lucascassiano/reViz3d);

<!--
Maybe I will move this intro the a simple standalone page. And put something more technical here. idk. -Lucas
-->