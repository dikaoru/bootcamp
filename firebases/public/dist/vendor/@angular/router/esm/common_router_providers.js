import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { APP_INITIALIZER, ApplicationRef, ComponentResolver, Injector } from '@angular/core';
import { Router } from './router';
import { RouterOutletMap } from './router_outlet_map';
import { ActivatedRoute } from './router_state';
import { DefaultUrlSerializer, UrlSerializer } from './url_serializer';
export function provideRouter(config) {
    return [
        Location,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: UrlSerializer, useClass: DefaultUrlSerializer },
        {
            provide: Router,
            useFactory: (ref, resolver, urlSerializer, outletMap, location, injector) => {
                if (ref.componentTypes.length == 0) {
                    throw new Error('Bootstrap at least one component before injecting Router.');
                }
                const componentType = ref.componentTypes[0];
                const r = new Router(componentType, resolver, urlSerializer, outletMap, location, injector, config);
                ref.registerDisposeListener(() => r.dispose());
                return r;
            },
            deps: [ApplicationRef, ComponentResolver, UrlSerializer, RouterOutletMap, Location, Injector]
        },
        RouterOutletMap,
        { provide: ActivatedRoute, useFactory: (r) => r.routerState.root, deps: [Router] },
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: (injector) => {
                setTimeout(_ => {
                    const appRef = injector.get(ApplicationRef);
                    if (appRef.componentTypes.length == 0) {
                        appRef.registerBootstrapListener((_) => {
                            injector.get(Router).initialNavigation();
                        });
                    }
                    else {
                        injector.get(Router).initialNavigation();
                    }
                }, 0);
                return _ => null;
            },
            deps: [Injector]
        }
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX3JvdXRlcl9wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uX3JvdXRlcl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxpQkFBaUI7T0FDekUsRUFBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWU7T0FHbkYsRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVO09BQ3hCLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCO09BQzVDLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCO09BQ3RDLEVBQUMsb0JBQW9CLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCO0FBcUJwRSw4QkFBOEIsTUFBb0I7SUFDaEQsTUFBTSxDQUFDO1FBQ0wsUUFBUTtRQUNSLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBQztRQUMzRCxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFDO1FBRXhEO1lBQ0UsT0FBTyxFQUFFLE1BQU07WUFDZixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVE7Z0JBQ3RFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztnQkFDL0UsQ0FBQztnQkFDRCxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FDaEIsYUFBYSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ25GLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQztZQUNELElBQUksRUFDQSxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7U0FDNUY7UUFFRCxlQUFlO1FBQ2YsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBQztRQUdoRjtZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsVUFBVSxFQUFFLENBQUMsUUFBUTtnQkFJbkIsVUFBVSxDQUFDLENBQUM7b0JBQ1YsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDNUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQzs0QkFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO3dCQUMxQyxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtvQkFDMUMsQ0FBQztnQkFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7WUFDbkIsQ0FBQztZQUNELElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUNqQjtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMb2NhdGlvbiwgTG9jYXRpb25TdHJhdGVneSwgUGF0aExvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgQXBwbGljYXRpb25SZWYsIENvbXBvbmVudFJlc29sdmVyLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Um91dGVyQ29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IHtSb3V0ZXJPdXRsZXRNYXB9IGZyb20gJy4vcm91dGVyX291dGxldF9tYXAnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnLi9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtEZWZhdWx0VXJsU2VyaWFsaXplciwgVXJsU2VyaWFsaXplcn0gZnJvbSAnLi91cmxfc2VyaWFsaXplcic7XG5cblxuLyoqXG4gKiBBIGxpc3Qgb2Yge0BsaW5rIFByb3ZpZGVyfXMuIFRvIHVzZSB0aGUgcm91dGVyLCB5b3UgbXVzdCBhZGQgdGhpcyB0byB5b3VyIGFwcGxpY2F0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBAQ29tcG9uZW50KHtkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdfSlcbiAqIGNsYXNzIEFwcENtcCB7XG4gKiAgIC8vIC4uLlxuICogfVxuICpcbiAqIGNvbnN0IHJvdXRlciA9IFtcbiAqICAge3BhdGg6ICcvaG9tZScsIGNvbXBvbmVudDogSG9tZX1cbiAqIF07XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgW3Byb3ZpZGVSb3V0ZXIocm91dGVyKV0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUm91dGVyKGNvbmZpZzogUm91dGVyQ29uZmlnKTogYW55W10ge1xuICByZXR1cm4gW1xuICAgIExvY2F0aW9uLFxuICAgIHtwcm92aWRlOiBMb2NhdGlvblN0cmF0ZWd5LCB1c2VDbGFzczogUGF0aExvY2F0aW9uU3RyYXRlZ3l9LFxuICAgIHtwcm92aWRlOiBVcmxTZXJpYWxpemVyLCB1c2VDbGFzczogRGVmYXVsdFVybFNlcmlhbGl6ZXJ9LFxuXG4gICAge1xuICAgICAgcHJvdmlkZTogUm91dGVyLFxuICAgICAgdXNlRmFjdG9yeTogKHJlZiwgcmVzb2x2ZXIsIHVybFNlcmlhbGl6ZXIsIG91dGxldE1hcCwgbG9jYXRpb24sIGluamVjdG9yKSA9PiB7XG4gICAgICAgIGlmIChyZWYuY29tcG9uZW50VHlwZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcCBhdCBsZWFzdCBvbmUgY29tcG9uZW50IGJlZm9yZSBpbmplY3RpbmcgUm91dGVyLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFR5cGUgPSByZWYuY29tcG9uZW50VHlwZXNbMF07XG4gICAgICAgIGNvbnN0IHIgPSBuZXcgUm91dGVyKFxuICAgICAgICAgICAgY29tcG9uZW50VHlwZSwgcmVzb2x2ZXIsIHVybFNlcmlhbGl6ZXIsIG91dGxldE1hcCwgbG9jYXRpb24sIGluamVjdG9yLCBjb25maWcpO1xuICAgICAgICByZWYucmVnaXN0ZXJEaXNwb3NlTGlzdGVuZXIoKCkgPT4gci5kaXNwb3NlKCkpO1xuICAgICAgICByZXR1cm4gcjtcbiAgICAgIH0sXG4gICAgICBkZXBzOlxuICAgICAgICAgIFtBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50UmVzb2x2ZXIsIFVybFNlcmlhbGl6ZXIsIFJvdXRlck91dGxldE1hcCwgTG9jYXRpb24sIEluamVjdG9yXVxuICAgIH0sXG5cbiAgICBSb3V0ZXJPdXRsZXRNYXAsXG4gICAge3Byb3ZpZGU6IEFjdGl2YXRlZFJvdXRlLCB1c2VGYWN0b3J5OiAocikgPT4gci5yb3V0ZXJTdGF0ZS5yb290LCBkZXBzOiBbUm91dGVyXX0sXG5cbiAgICAvLyBUcmlnZ2VyIGluaXRpYWwgbmF2aWdhdGlvblxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgdXNlRmFjdG9yeTogKGluamVjdG9yKSA9PiB7XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzkxMDFcbiAgICAgICAgLy8gRGVsYXkgdGhlIHJvdXRlciBpbnN0YW50aWF0aW9uIHRvIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY3kgKEFwcGxpY2F0aW9uUmVmIC0+XG4gICAgICAgIC8vIEFQUF9JTklUSUFMSVpFUiAtPiBSb3V0ZXIpXG4gICAgICAgIHNldFRpbWVvdXQoXyA9PiB7XG4gICAgICAgICAgY29uc3QgYXBwUmVmID0gaW5qZWN0b3IuZ2V0KEFwcGxpY2F0aW9uUmVmKTtcbiAgICAgICAgICBpZiAoYXBwUmVmLmNvbXBvbmVudFR5cGVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBhcHBSZWYucmVnaXN0ZXJCb290c3RyYXBMaXN0ZW5lcigoXykgPT4ge1xuICAgICAgICAgICAgICBpbmplY3Rvci5nZXQoUm91dGVyKS5pbml0aWFsTmF2aWdhdGlvbigpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5qZWN0b3IuZ2V0KFJvdXRlcikuaW5pdGlhbE5hdmlnYXRpb24oKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICAgIHJldHVybiBfID0+IG51bGw7XG4gICAgICB9LFxuICAgICAgZGVwczogW0luamVjdG9yXVxuICAgIH1cbiAgXTtcbn1cbiJdfQ==