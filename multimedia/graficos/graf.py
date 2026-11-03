import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
plt.rcParams.update({"font.family":"DejaVu Sans","font.size":10,"axes.spines.top":False,"axes.spines.right":False})
F=["001 Catálogo","002 Planes","003 Consulta"]
C1,C2,C3="#80623B","#CAA97A","#3B3024"
def save(fig,n): fig.tight_layout(); fig.savefig(n,dpi=200); plt.close(fig)
# g2 apilado
fig,ax=plt.subplots(figsize=(6.4,3.4))
a=[8,6,7]; b=[2,2,2]
ax.bar(F,a,color=C1,width=.55,label="Antes de implementar (C)")
ax.bar(F,b,bottom=a,color=C2,width=.55,label="Durante la implementación (C/D)")
for i in range(3): ax.text(i,a[i]+b[i]+.2,str(a[i]+b[i]),ha="center",fontweight="bold")
ax.set_ylim(0,14.5); ax.set_ylabel("Hallazgos"); ax.set_title("Hallazgos de la clarificación (QA de la IA)",loc="left",fontweight="bold")
ax.legend(frameon=False,fontsize=8,loc="upper center",ncol=2); save(fig,"g2-hallazgos.png")
# g4 commits
fig,ax=plt.subplots(figsize=(6.4,3.4))
L=["Docs y arnés","001 Catálogo","002 Planes","003 Consulta"]; v=[2,7,6,7]
ax.bar(L,v,color=[C3,C1,C1,C1],width=.55)
for i,x in enumerate(v): ax.text(i,x+.15,str(x),ha="center",fontweight="bold")
ax.set_ylim(0,8.5); ax.set_ylabel("Commits"); ax.set_title("Commits por funcionalidad (22 en total)",loc="left",fontweight="bold"); save(fig,"g4-commits.png")
# g5 tests
fig,ax=plt.subplots(figsize=(6.4,3.4))
L=["Cierre 001","Cierre 002","Cierre 003"]; v=[32,65,103]
ax.plot(L,v,color=C1,marker="o",lw=2.5,ms=8)
for i,x in enumerate(v): ax.text(i,x+6,f"{x} tests",ha="center" if i else "left",fontweight="bold")
ax.set_ylim(0,120); ax.set_ylabel("Tests en verde (acumulados)"); ax.set_title("Crecimiento de los tests automatizados",loc="left",fontweight="bold"); save(fig,"g5-tests.png")
