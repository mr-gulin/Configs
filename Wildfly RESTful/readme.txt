� �������. ���������� � ������������ wildfly �������� ����������� ������.
./standalone.bat -c standalone.xml

./jboss-cli.bat -c

/subsystem=undertow/configuration=handler/file=InternetTechnologyHandler/:add(cache-buffer-size=1024,cache-buffers=1024,directory-listing=true,follow-symlink=true,path=C:/Work/git/Labs/4 course/Internet technology/Angular/dist/)

/subsystem=undertow/server=default-server/host=default-host/location=\/internettechnologyws\/html/:add(handler=InternetTechnologyHandler)



��������� ���-�������:
�����:
	1. ApplicationConfig (src/main/java)
		import javax.ws.rs.ApplicationPath;
		import javax.ws.rs.core.Application;

		@ApplicationPath("api") // set the path to REST web services
		public class ApplicationConfig extends Application {}
	2. Generic (Controller) (src/main/java)

	3. Config (src/main/webapp/WEB-INF)
		- jboss-web.xml
		- web.xml

� ����� ���� ���������� ���������: localhost:8080/ws/api/generic/method?param=123, ��� ws - ��� context-root, �������� � jboss-web.xml, api - ApplicationPath, 
generic - ��� �����������. �� � ������ �� �������.

