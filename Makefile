sourceJs = js/dt.js 
outputDir = js/
sassSrc = css/layout.scss
name = dtapp

fcompile:
	fuse -i $(sourceJs) -o $(outputDir)$(name).js
	fuse -i $(sourceJs) -o $(outputDir)$(name).min.js -m -c

fwatch:
	fuse -i $(sourceJs) -o $(outputDir)$(name).js -w

swatch:
	sass --watch $(sassSrc):css/layout.css