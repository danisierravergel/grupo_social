from flask import Flask,jsonify,request,render_template, redirect, url_for
from bs4 import BeautifulSoup
import requests as rq
from statistics import *
from scipy import stats

app = Flask(__name__)

def todo():
    url = 'https://www.datos.gov.co/browse?limitTo=datasets' #limitTo=datasets&sortBy=last_modified

    page = rq.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    todo = {}
    
    for a in soup.find_all('a', href=True , class_= 'browse2-result-name-link'): #listado de temas
        link = a['href'].split("/")
        u = len(link)-1
        link1 = link[u]
        todo[link1]=a.text #9ssf-i6c5 
    
    return todo


@app.route('/json',methods=["GET"])
def json():
    todos2 = todo()
    return jsonify(todos2) 

@app.route("/echo", methods=["GET"])
def echo():
    celular = request.args.get('celular', default=0, type=int)
    if(celular == 123456):
        return render_template('/admin.html', celular=celular)
    if(celular == 0):
        return render_template('/')
    return render_template('/echo.html',  dat=todo(), celular=celular)

@app.route('/calcular',methods=["POST"])
def calcular():
    if request.method == 'POST':
        data = request.form['columna']
        data = data.split(',')
        datass = []
        for x in data:
            datass.append(float(x))
            
        iqr = iqr = stats.iqr(datass, interpolation = 'midpoint') 
        mo = stats.mode(data)
        resp = {'media':mean(datass),
               'moda': float(mo.mode[0]),
               'mediana':median(datass),
               'st_dev':pstdev(datass),
               'iqr':iqr,
               'mini':min(datass),
               'maxi':max(datass)} 
       
    return resp

@app.route("/",methods = ['POST', 'GET'])
def show_signup_form():
    celular = 0
    if request.method == 'POST':
        celular = request.form['celular']
        return redirect(url_for('echo', celular=celular))
    else:
        return render_template("form.html", celular=celular)

if __name__=="__main__":
    app.run(host="0.0.0.0",port=80)